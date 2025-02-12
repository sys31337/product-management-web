import axiosInstance from '@/shared/services/api';
import { useMutation } from '@tanstack/react-query';

interface SignupPayload {
  email: string;
  password: string;
  confirm: string;
}

type SignInPayload = Omit<SignupPayload, 'confirm'>;

export const useLogin = () => useMutation({ mutationFn: (data: SignInPayload) => axiosInstance.request({ url: 'users/auth', method: 'POST', data }) })
export const useSignup = () => useMutation({ mutationFn: (data: SignupPayload) => axiosInstance.request({ url: 'users', method: 'POST', data }) })
