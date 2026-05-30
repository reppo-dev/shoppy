"use client";

import { addToCart } from "@/app/action/cart";
import { getProduct } from "@/app/action/product";
import { Button } from "@/components/ui/button";
import { Products } from "@/interface";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProductDetail = () => {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const [product, setProduct] = useState<Products>();

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(productId);
      setProduct(product.data);
    };
    fetchProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = async (productId: number) => {
    const result = await addToCart(productId, 1);
    if (result.success) {
      toast("Added!");
    } else {
      toast(result.success);
    }
  };

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="mt-10 w-full max-w-5xl mx-auto">
        <Image
          className="rounded-sm"
          src={product.image}
          width={500}
          height={500}
          alt={product.name}
        />
        <div className="flex flex-col w-fit mt-4 gap-2 sm:gap-4 border p-4 rounded-md">
          <div className="border h-10 items-center rounded-md flex w-fit pr-2">
            <span className="ml-2 font-semibold">Name: {product.name}</span>
          </div>
          <div className="border h-fit py-2 items-center rounded-md flex w-fit pr-2">
            <span className="ml-2 font-semibold">
              Description: {product.description}
            </span>
          </div>
          <div className="border h-10 items-center rounded-md flex w-fit pr-2">
            <span className="ml-2 font-semibold">Price: ${product.price}</span>
          </div>
          <Button onClick={() => handleAddToCart(product.ID)}>
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
