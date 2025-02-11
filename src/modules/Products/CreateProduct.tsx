import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetCategories } from '@/api/useCategories';
import Loading from '@/shared/components/Loading';
import { Category } from '@/shared/types/category';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateProduct } from '@/api/useProduct';

const CreateProduct = () => {
  const { data: categories, isFetching } = useGetCategories();
  const { mutateAsync: createProduct } = useCreateProduct();
  const [payload, setPayload] = useState({ name: '', description: '', price: 0, quantity: 1, category: '' });

  const updateValues = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setPayload((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct(payload);
  }
  return isFetching ? <Loading /> : (
    <form onSubmit={handleSubmit} autoComplete='none' className='max-w-md mx-auto'>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
            <Label className="mb-1" htmlFor="name">Category</Label>
            <Select onValueChange={(v) => setPayload((prev) => ({ ...prev, category: v }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map(({ _id, name }: Category) => (
                  <SelectItem key={_id} value={_id}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
            <Label className="mb-1" htmlFor="name">Product name</Label>
            <Input type="name" name="name" placeholder="Product name" onChange={updateValues} />
          </div>

          <div className="flex gap-2">
            <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
              <Label className="mb-1" htmlFor="price">Price</Label>
              <Input type="price" name="price" placeholder="Price" onChange={updateValues} />
            </div>
            <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
              <Label className="mb-1" htmlFor="quantity">Quantity</Label>
              <Input type="quantity" name="quantity" placeholder="Quantity" onChange={updateValues} />
            </div>
          </div>
          <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
            <Label className="mb-1" htmlFor="quantity">Product description</Label>
            <Textarea name="description" placeholder="Product description" onChange={updateValues} />
          </div>
        </div>
        <button className="btn-primary" type="submit">Create</button>
      </div>
    </form>
  )
}

export default CreateProduct
