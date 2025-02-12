import axiosInstance from '@/shared/services/api';
import queryClient from '@/shared/services/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';

interface CategoryPayload {
  name: string;
  description: string;
}

export const useCreateCategory = () => useMutation({ mutationFn: (data: CategoryPayload) => axiosInstance.request({ url: 'categories', method: 'POST', data }) })

export const useGetCategories = () => useQuery({
  queryKey: ['Get categories'],
  queryFn: () => axiosInstance.request({ method: 'GET', url: 'categories', params: { active: true } }).then(({ data }) => data),
  gcTime: 0
});

export const useGetCategoriesWithParams = (page: number, limit: number) => useQuery({
  queryKey: ['Get categories', page, limit],
  queryFn: () => axiosInstance.request({ method: 'GET', url: 'categories', params: { page, limit } }).then(({ data }) => data),
  enabled: !!page,
  gcTime: 0
});

export const useEditCategory = (id?: string) => useMutation({
  mutationFn: (data: CategoryPayload) => axiosInstance.request({ url: `categories/${id}`, method: 'PUT', data }),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['Get category', id],
      exact: true,
    })
  }
});

export const useGetCategory = (id?: string) => useQuery({
  queryKey: ['Get category', id],
  queryFn: () => axiosInstance.request({ method: 'GET', url: `categories/${id}` }).then(({ data }) => data),
  gcTime: 0
});

export const useDeleteCategory = () => useMutation({
  mutationFn: (data: { id: string }) => axiosInstance.request({ url: `categories/${data.id}`, method: 'DELETE', data }),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['Get categories'],
    })
  }
});
