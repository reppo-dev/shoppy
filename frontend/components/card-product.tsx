"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { allProducts } from "@/app/action/product";
import { Products } from "@/interface";
import Link from "next/link";
import { addToCart } from "@/app/action/cart";
import { toast } from "sonner";
import { Button } from "./ui/button";

const CardProduct = () => {
  const [product, setProduct] = useState<Products[]>([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await allProducts();
      setProduct(response.data);
    };
    fetchProduct();
  }, []);

  const handleAddToCart = async (productId: number) => {
    const result = await addToCart(productId, 1);
    if (result.success) {
      toast("Added!");
    } else {
      toast(result.success);
    }
  };

  return (
    <div>
      {product.map((pr) => (
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
    </div>
  );
};

export default CardProduct;
