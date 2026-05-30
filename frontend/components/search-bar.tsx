// components/search-bar.tsx
"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchBarProps {
  onSearch: (term: string) => void;
  initialValue?: string;
}

export function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
  const [term, setTerm] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder="Search products..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
