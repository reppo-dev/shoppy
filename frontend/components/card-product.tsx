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

const CardProduct = () => {
  const [product, setProduct] = useState<Products[]>([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await allProducts();
      setProduct(response.data);
    };
    fetchProduct();
  }, []);

  return (
    <div>
      {product.map((pr) => (
        <Link href={`/products/${pr.ID}`} key={pr.ID}>
          <Card>
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
            <CardContent className="flex flex-col gap-4">
              <span>{pr.price}</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CardProduct;
