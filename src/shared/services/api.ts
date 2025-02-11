/* eslint-disable camelcase */
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

const refreshAccessToken = async (refreshToken: string) => {
  const response = await axios.request({
    method: 'POST',
    url: `${cfg.api}/api/v1/users/token`,
    data: { refreshToken },
  });

  const { data: { accessToken: token, refreshToken: newRefreshToken, googleToken } } = response;
  const { userId: user_id, fullname: full_name } = parseJwt(token);

  const userData = { user_id, full_name, token, refreshToken: newRefreshToken, googleToken };

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
      console.log(expiresAt);
      const currentTime = Math.ceil(Date.now() / 1000);
      const notExpired = currentTime < expiresAt;
      if (notExpired) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        try {
          const response = await refreshAccessToken(refreshToken);
          const { data } = response;
          const { accessToken: at } = data;
          config.headers.Authorization = `Bearer ${at}`;
        } catch (_error) {
          authService.resetUserInfo();
          location.replace('/connexion');
        }
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
