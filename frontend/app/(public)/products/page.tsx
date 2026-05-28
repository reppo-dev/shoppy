// app/products/page.tsx (یا هر جای دیگر که Products را رندر می‌کنی)
"use client";

import { useState, useEffect } from "react";
import CardProduct from "@/components/card-product";
import CategoryFilter from "@/components/category-filter";
import { getProductsByCategories } from "@/app/action/product";
import { Products as ProductsType } from "@/interface";
import { CreateProduct } from "@/components/create-product";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (categoryIds: number[]) => {
    setLoading(true);
    const result = await getProductsByCategories(categoryIds);
    if (result.success) {
      setProducts(result.data);
    } else {
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(selectedCategories);
  }, [selectedCategories]);

  return (
    <div>
      <CreateProduct />
      <CategoryFilter onCategoryChange={setSelectedCategories} />
      <div className="grid grid-cols-4 mx-10 gap-4">
        {loading ? (
          <p className="col-span-full text-center">Loading...</p>
        ) : (
          <CardProduct products={products} />
        )}
      </div>
    </div>
  );
}
