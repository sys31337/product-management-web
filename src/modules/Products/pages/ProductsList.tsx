"use client"

import type React from "react"
import { useState } from "react"
import { Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/shared/types/product"
import Pagination from "@/shared/components/Pagination"
import { Link, useSearchParams } from "react-router-dom"
import { useDeleteProduct, useGetProducts } from "@/api/useProduct"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BiDotsHorizontal } from "react-icons/bi";
import DeleteConfirmationDialog from "@/shared/components/ConfirmationDialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ProductsList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const limit = Number(searchParams.get("limit") ?? 10)
  const currentPage = Number(searchParams.get("currentPage") ?? 1)
  const { data } = useGetProducts(currentPage, limit);
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const products = data?.products as Product[];
  const { count } = data || { count: data?.products?.length };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  const handleDelete = (productId: string) => {
    setProductToDelete(productId)
    setIsDeleteDialogOpen(true)
  }

  const onDelete = async () => {
    if (productToDelete) {
      await deleteProduct({ id: productToDelete })
    }
    setIsDeleteDialogOpen(false)
    setProductToDelete(null)
  }

  return (
    <>
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold mb-6">Our Products</h1>
        <div className="flex gap-1 items-center">
          <Select onValueChange={(v) => {
            searchParams.set("limit", v)
            setSearchParams(searchParams)
          }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="9999999999">All</SelectItem>
            </SelectContent>
          </Select>
          <Link to="/products/create">
            <button className="btn-primary">Create product</button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {products?.map((product) => (
          <Card key={product._id} className="flex flex-col">
            <CardHeader className="relative">
              <Badge variant="secondary" className="w-fit mb-2">
                {product.category.name}
              </Badge>
              <CardTitle className="flex justify-between items-center mx-1"> {product.name} </CardTitle>
              <div className="absolute top-1 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-8 h-8">
                      <BiDotsHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{product.name}</DropdownMenuLabel>
                    <Link to={`/products/edit/${product._id}`}><DropdownMenuItem>Edit</DropdownMenuItem></Link>
                    <DropdownMenuItem onClick={() => handleDelete(product._id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{product?.description || ""}</CardDescription>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <Tag className="mr-1 h-4 w-4" />
                <span>In stock: {product.quantity}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
              <Button>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-5">
        <Pagination
          totalCount={count}
          currentPage={currentPage}
          pageSize={limit}
          onPageChange={(page) => {
            searchParams.set("currentPage", `${page}`)
            setSearchParams(searchParams)
          }}
        />
      </div>
      <DeleteConfirmationDialog isOpen={isDeleteDialogOpen} setIsOpen={setIsDeleteDialogOpen} onSubmit={onDelete} />
    </>
  )
}

export default ProductsList
