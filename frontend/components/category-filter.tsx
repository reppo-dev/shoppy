// components/category-filter.tsx
"use client";

import { getCategories } from "@/app/action/category";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Category {
  ID: number;
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
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : []);
    };
    fetchCategories();
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
          <Label key={cat.ID} className="flex items-center gap-1">
            <Input
              type="checkbox"
              checked={selected.includes(cat.ID)}
              onChange={() => handleToggle(cat.ID)}
            />
            {cat.name}
          </Label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
