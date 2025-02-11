import axiosInstance from '@/shared/services/api';
import { useMutation, useQuery } from '@tanstack/react-query';

interface ProductPayload {
  email: string;
  password: string;
  confirm: string;
}

export const useCreateProduct = () => useMutation({ mutationFn: (data: ProductPayload) => axiosInstance.request({ url: 'products', method: 'POST', data }) })

export const useGetProducts = () => useQuery({
  queryKey: ['Get products'],
  queryFn: () => axiosInstance.request({ method: 'GET', url: 'products' }).then(({ data }) => data),
  gcTime: 0
});
