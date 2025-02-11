import React from 'react'
import ProductsList from './ProductsList'
import { useGetProducts } from '@/api/useProduct'
import { Product } from '@/shared/types/product';
import Loading from '@/shared/components/Loading';

const Products: React.FC = () => {
  const { data, isFetching } = useGetProducts();
  const products = data?.products as Product[];
  console.log(products)
  return isFetching ? <Loading /> : (
    <div>
      <div className='flex w-full justify-between'>
        <h1 className="text-2xl font-bold mb-6">Our Products</h1>
        <button className="btn-primary">Create product</button>
      </div>
      <ProductsList products={products} />
    </div>
  )
}

export default Products
