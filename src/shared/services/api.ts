import cfg from '@/config';
import axios from 'axios';
import { logoutUser } from '@/shared/hooks/useAuthentication';
import { Any } from '@/shared/types/any';
import { Payload } from '@/shared/types/payload';
import parseJwt from '@/shared/functions/parseJWT';
import cacheService from './cache';
import authService from './auth';

const addAuthHeaders = (request: Any) => {
  request.headers?.delete('x-public');
};

const axiosInstance = axios.create({ baseURL: `${cfg.api}/api/v1/` });

const refreshAccessToken = async (currentRefreshToken: string) => {
  const response = await axios.request({
    method: 'POST',
    url: `${cfg.api}/api/v1/users/refresh`,
    headers: { Authorization: `Refresh ${currentRefreshToken}` }
  });
  const { data: { accessToken, refreshToken } } = response;
  const { userId, fullname } = parseJwt(accessToken);

  const userData = {
    userId, fullname, accessToken, refreshToken,
  };

  authService.saveUserInfo(userData);
  return response;
};

const getUserAccessToken = () => {
  const accessToken = (cacheService.get('USER_INFO') as Payload)?.accessToken;
  const refreshToken = (cacheService.get('USER_INFO') as Payload)?.refreshToken;
  return { accessToken, refreshToken };
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const { accessToken, refreshToken }: Any = getUserAccessToken();
    if (refreshToken && accessToken) {
      const expiresAt = parseJwt(accessToken).exp;
      const currentTime = Math.floor(Date.now() / 1000);
      const expired = currentTime > expiresAt;
      if (expired) {
        try {
          const { data } = await refreshAccessToken(refreshToken);
          const { accessToken: newAccessToken } = data;
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } catch (error) {
          console.log(error);
          authService.resetUserInfo();
          location.replace('/connexion');
        }
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    addAuthHeaders(config);
    return config;
  },
  async (error) => {
    const isUnauthorized = error.status === 401 || error.status === 403;
    if (isUnauthorized) {
      await logoutUser();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
