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

export const useEditProduct = (id?: string) => useMutation({
  mutationFn: (data: ProductPayload) => axiosInstance.request({ url: `products/${id}`, method: 'PUT', data }),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['Get product', id],
      exact: true,
    })
  }
});

export const useDeleteProduct = () => useMutation({
  mutationFn: (data: { id: string }) => axiosInstance.request({ url: `products/${data.id}`, method: 'DELETE', data }),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['Get products'],
    })
  }
});

export const useGetProducts = (page: number, limit: number) => useQuery({
  queryKey: ['Get products', page, limit],
  queryFn: () => axiosInstance.request({ method: 'GET', url: 'products', params: { page, limit } }).then(({ data }) => data),
  enabled: !!page,
  gcTime: 0
});

export const useGetProduct = (id?: string) => useQuery({
  queryKey: ['Get product', id],
  queryFn: () => axiosInstance.request({ method: 'GET', url: `products/${id}` }).then(({ data }) => data),
  gcTime: 0
});
