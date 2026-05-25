"use client";

import { getProduct } from "@/app/action/product";
import { Products } from "@/interface";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  }, []);

  if (!product) return <div>Loading...</div>;
  return (
    <div className="w-screen justify-center">
      <div className=" mt-10 mx-10">
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
