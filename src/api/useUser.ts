import axiosInstance from '@/shared/services/api';
import { useMutation, useQuery } from '@tanstack/react-query';

interface SignupPayload {
  email: string;
  password: string;
  confirm: string;
}

type SignInPayload = Omit<SignupPayload, 'confirm'>;

export const useLogin = () => useMutation({ mutationFn: (data: SignInPayload) => axiosInstance.request({ url: 'users/auth', method: 'POST', data }) })
export const useSignup = () => useMutation({ mutationFn: (data: SignupPayload) => axiosInstance.request({ url: 'users', method: 'POST', data }) })

export const useGetUserInformation = (id?: string) => useQuery({
  queryKey: ['Get current user', id],
  queryFn: () => axiosInstance
    .request({
      method: 'GET',
      url: 'discord/current',
    })
    .then(({ data }) => data),
  enabled: !!id,
  gcTime: 0
});
