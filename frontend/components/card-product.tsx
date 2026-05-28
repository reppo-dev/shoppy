// components/card-product.tsx
"use client";

import { Products } from "@/interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/app/action/cart";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface CardProductProps {
  products: Products[];
}

const CardProduct = ({ products }: CardProductProps) => {
  const handleAddToCart = async (productId: number) => {
    const result = await addToCart(productId, 1);
    if (result.success) {
      toast.success("Added to cart!");
    } else {
      toast.error(result.message || "Failed to add");
    }
  };

  if (!products.length) {
    return <p className="col-span-full text-center">No products found.</p>;
  }

  return (
    <>
      {products.map((pr) => (
        <Card key={pr.ID}>
          <Link href={`/products/${pr.ID}`}>
            <CardHeader>
              <div className="flex items-center justify-center">
                <Image
                  width={350}
                  height={350}
                  className="rounded-sm"
                  src={pr.image}
                  alt={pr.name}
                />
              </div>
              <CardTitle>{pr.name}</CardTitle>
              <CardDescription>{pr.description}</CardDescription>
            </CardHeader>
          </Link>
          <CardContent className="flex flex-col gap-4">
            <span>{pr.price}</span>
            <Button onClick={() => handleAddToCart(pr.ID)}>Add To Cart</Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default CardProduct;
