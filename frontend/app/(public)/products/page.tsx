"use client";

import { useState, useEffect } from "react";
import CardProduct from "@/components/card-product";
import CategoryFilter from "@/components/category-filter";
import { getProductsByCategories } from "@/app/action/product";
import { Products as ProductsType } from "@/interface";
import { CreateProduct } from "@/components/create-product";
import { searchProducts } from "@/app/action/search";
import { SearchBar } from "@/components/search-bar";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    const result = await searchProducts(searchTerm, selectedCategories);
    if (result.success) {
      setProducts(result.data || []);
    } else {
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategories]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  return (
    <div>
      <CreateProduct />
      <div className="container mx-auto px-4 py-6">
        <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
        <CategoryFilter onCategoryChange={setSelectedCategories} />
        <div className="grid grid-cols-4 mx-10 gap-4 mt-6">
          {loading ? (
            <p className="col-span-full text-center">Loading...</p>
          ) : (
            <CardProduct products={products} />
          )}
        </div>
      </div>
    </div>
  );
}
