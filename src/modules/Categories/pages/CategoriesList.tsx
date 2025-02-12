"use client"

import type React from "react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import type { Category } from "@/shared/types/category"
import Pagination from "@/shared/components/Pagination"
import { Link, useSearchParams } from "react-router-dom"
import { useDeleteCategory, useGetCategoriesWithParams } from "@/api/useCategories"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DeleteConfirmationDialog from "@/shared/components/ConfirmationDialog"
import { Button } from "@/components/ui/button"

const CategoriesList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const limit = Number(searchParams.get("limit") ?? 10)
  const currentPage = Number(searchParams.get("currentPage") ?? 1)
  const { data } = useGetCategoriesWithParams(currentPage, limit);
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const categories = data?.categories as Category[]
  const { count } = data || { count: data?.products?.length };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

  const handleDelete = (categoryId: string) => {
    setCategoryToDelete(categoryId)
    setIsDeleteDialogOpen(true)
  }

  const onDelete = async () => {
    if (categoryToDelete) {
      await deleteCategory({ id: categoryToDelete })
    }
    setIsDeleteDialogOpen(false)
    setCategoryToDelete(null)
  }

  return (
    <>
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold mb-6">Our Categories</h1>
        <div className="flex gap-1 items-center">
          <Select onValueChange={(v) => {
            searchParams.set("limit", v)
            setSearchParams(searchParams)
          }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="9999999999">All</SelectItem>
            </SelectContent>
          </Select>
          <Link to="/categories/create">
            <button className="btn-primary">Create category</button>
          </Link>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category._id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.description || "N/A"}</TableCell>
              <TableCell>
                <Badge variant={category.status === "active" ? "default" : "secondary"}>{category.status}</Badge>
              </TableCell>
              <TableCell>{category?.products?.length || 0}</TableCell>
              <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="justify-end items-center flex gap-1">
                <Link to={`/categories/edit/${category._id}`}><Button>Edit</Button></Link>
                <Button variant="destructive" onClick={() => handleDelete(category._id)} className="p-3">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

export default CategoriesList
