import React from 'react';
import { Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Product } from '@/shared/types/product';

interface ProductsListProps {
  products: Product[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
    {products?.map((product) => (
      <Card key={product._id} className="flex flex-col">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {product.name}
            <Badge variant="secondary">{product.category.name}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription>{product?.description || ''}</CardDescription>
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
)

export default ProductsList
