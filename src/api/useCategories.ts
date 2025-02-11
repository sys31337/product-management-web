import axiosInstance from '@/shared/services/api';
import { useMutation, useQuery } from '@tanstack/react-query';

interface ProductPayload {
  email: string;
  password: string;
  confirm: string;
}

export const useCreateProduct = () => useMutation({ mutationFn: (data: ProductPayload) => axiosInstance.request({ url: 'products', method: 'POST', data }) })

export const useGetCategories = () => useQuery({
  queryKey: ['Get categories'],
  queryFn: () => axiosInstance.request({ method: 'GET', url: 'categories', params: { active: true } }).then(({ data }) => data),
  gcTime: 0
});
