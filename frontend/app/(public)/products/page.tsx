import CardProduct from "@/components/card-product";
import { CreateProduct } from "@/components/create-product";
import React from "react";

const Products = () => {
  return (
    <div>
      <CreateProduct />
      <div className="grid grid-cols-4 mx-10">
        <CardProduct />
      </div>
    </div>
  );
};

export default Products;
