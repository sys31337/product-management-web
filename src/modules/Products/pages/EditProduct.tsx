import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetCategories } from '@/api/useCategories';
import Loading from '@/shared/components/Loading';
import { Category } from '@/shared/types/category';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEditProduct, useGetProduct } from '@/api/useProduct';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const { productId } = useParams();
  const { data: categories, isFetching: gettingCategories } = useGetCategories();
  const { mutateAsync: editProduct } = useEditProduct(productId);
  const { data: product, isFetching: gettingProduct } = useGetProduct(productId);
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    name: product?.name,
    description: product?.description,
    price: product?.price,
    quantity: product?.quantity,
    category: product?.category
  });
  const isFetching = gettingCategories || gettingProduct;
  const updateValues = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setPayload((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editProduct(payload);
    navigate(0);
  }

  return isFetching ? <Loading /> : (
    <>
      <div className='flex w-full justify-between'>
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        <Link to="/products">
          <button className="btn-primary">Products list</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} autoComplete='none' className='max-w-md mx-auto'>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
              <Label className="mb-1" htmlFor="name">Category</Label>
              <Select onValueChange={(v) => setPayload((prev) => ({ ...prev, category: v }))} defaultValue={product.category}>
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
              <Input type="name" name="name" defaultValue={product.name} placeholder="Product name" onChange={updateValues} />
            </div>

            <div className="flex gap-2">
              <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
                <Label className="mb-1" htmlFor="price">Price</Label>
                <Input type="price" name="price" defaultValue={product.price} placeholder="Price" onChange={updateValues} />
              </div>
              <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
                <Label className="mb-1" htmlFor="quantity">Quantity</Label>
                <Input type="quantity" name="quantity" defaultValue={product.quantity} placeholder="Quantity" onChange={updateValues} />
              </div>
            </div>
            <div className="grid w-full max-w-md items-center gap-1.5 mt-2">
              <Label className="mb-1" htmlFor="description">Product description</Label>
              <Textarea name="description" defaultValue={product.description} placeholder="Product description" onChange={updateValues} />
            </div>
          </div>
          <button className="btn-primary" type="submit">Update</button>
        </div>
      </form>
    </>
  )
}

export default EditProduct
