import axiosInstance from '@/shared/services/api';
import authService from '@/shared/services/auth';

export function useAuthenticated(): boolean {
  return authService.isAuthenticated();
}

export async function logoutUser() {
  await axiosInstance.get('/logout');
  authService.resetUserInfo();
  location.replace('/auth');
}
