// components/category-filter.tsx
"use client";

import { getCategories } from "@/app/action/category";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  onCategoryChange: (selectedIds: number[]) => void;
}

const CategoryFilter = ({ onCategoryChange }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleToggle = (id: number) => {
    const newSelected = selected.includes(id)
      ? selected.filter((c) => c !== id)
      : [...selected, id];
    setSelected(newSelected);
    onCategoryChange(newSelected);
  };

  return (
    <div className="p-4 border rounded mb-6">
      <h3 className="font-bold mb-3">Filter by Categories</h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <label key={cat.id} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={selected.includes(cat.id)}
              onChange={() => handleToggle(cat.id)}
            />
            {cat.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
