import axiosInstance from '@/shared/services/api';
import queryClient from '@/shared/services/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';

interface ProductPayload {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

export const useCreateProduct = () => useMutation({
  mutationFn: (data: ProductPayload) => axiosInstance.request({ url: 'products', method: 'POST', data }),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['Get products'],
      exact: true,
    })
  }
});

export const useGetProducts = (page: number, limit: number) => useQuery({
  queryKey: ['Get products', page],
  queryFn: () => axiosInstance.request({ method: 'GET', url: 'products', params: { page, limit } }).then(({ data }) => data),
  enabled: !!page,
  gcTime: 0
});
