import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';

const CreateProduct = React.lazy(() => import('./pages/CreateProduct'));
const EditProduct = React.lazy(() => import('./pages/EditProduct'));
const ProductsList = React.lazy(() => import('./pages/ProductsList'));

const Products: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsList />} />
      <Route path="/create" element={<CreateProduct />} />
      <Route path="/edit/:productId" element={<EditProduct />} />
    </Routes>
  )
}

export default Products
