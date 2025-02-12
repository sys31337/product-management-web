import React, { useState } from 'react';
import Loading from '@/shared/components/Loading';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEditCategory, useGetCategory } from '@/api/useCategories';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditCategory = () => {
  const { categoryId } = useParams();
  const { mutateAsync: editCategory } = useEditCategory(categoryId);
  const { data: category, isFetching: gettingCategory } = useGetCategory(categoryId);
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    name: category?.name,
    description: category?.description,
    status: category?.status,
  });
  const isFetching = gettingCategory;
  const updateValues = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setPayload((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editCategory(payload);
    navigate(0);
  }

  return isFetching ? <Loading /> : (
    <>
      <div className='flex w-full justify-between'>
        <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
        <Link to="/categories">
          <button className="btn-primary">Categories list</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} autoComplete='none' className='max-w-md mx-auto'>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
              <Label className="mb-1" htmlFor="name">Category name</Label>
              <Input type="name" name="name" defaultValue={category.name} placeholder="Category name" onChange={updateValues} />
            </div>

            <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
              <Label className="mb-1" htmlFor="description">Category description</Label>
              <Textarea name="description" defaultValue={category.description} placeholder="Category description" onChange={updateValues} />
            </div>
          </div>
          <button className="btn-primary" type="submit">Update</button>
        </div>
      </form>
    </>
  )
}

export default EditCategory
