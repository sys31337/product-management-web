import React from 'react'
import { Route, Routes } from 'react-router-dom';

const CreateCategory = React.lazy(() => import('./pages/CreateCategory'));
const EditCategory = React.lazy(() => import('./pages/EditCategory'));
const CategoriesList = React.lazy(() => import('./pages/CategoriesList'));

const Categories: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoriesList />} />
      <Route path="/create" element={<CreateCategory />} />
      <Route path="/edit/:categoryId" element={<EditCategory />} />
    </Routes>
  )
}

export default Categories
