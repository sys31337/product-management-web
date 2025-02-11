import React from 'react'
import ProductsList from './ProductsList'
import { Link, Route, Routes } from 'react-router-dom';
import CreateProduct from './CreateProduct';

const Products: React.FC = () => {
  return (
    <div>
      <div className='flex w-full justify-between'>
        <h1 className="text-2xl font-bold mb-6">Our Products</h1>
        <Link to="/products/create">
          <button className="btn-primary">Create product</button>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </div>
  )
}

export default Products
