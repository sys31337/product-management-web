import React, { useState } from 'react';
import { useCreateCategory } from '@/api/useCategories';
import Loading from '@/shared/components/Loading';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';

const CreateCategory = () => {
  const { mutateAsync: createCategory, isPending } = useCreateCategory();
  const [payload, setPayload] = useState({ name: '', description: '' });

  const updateValues = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setPayload((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCategory(payload);
  }

  return isPending ? <Loading /> : (
    <>
      <div className='flex w-full justify-between'>
        <h1 className="text-2xl font-bold mb-6">Our Categories</h1>
        <Link to="/categories">
          <button className="btn-primary">Categories list</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} autoComplete='none' className='max-w-md mx-auto'>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
              <Label className="mb-1" htmlFor="name">Category name</Label>
              <Input type="name" name="name" placeholder="Category name" onChange={updateValues} />
            </div>

            <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
              <Label className="mb-1" htmlFor="quantity">Category description</Label>
              <Textarea name="description" placeholder="Category description" onChange={updateValues} />
            </div>
          </div>
          <button className="btn-primary" type="submit">Create</button>
        </div>
      </form>
    </>
  )
}

export default CreateCategory
