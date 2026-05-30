"use server";

import axios from "axios";
import { allProducts } from "./product";

const GO_API_URL = process.env.GO_API_URL;

export async function getCategories() {
  try {
    const response = await axios.get(`${GO_API_URL}/getcategories`);

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getProductsByCategories(categoryIds: number[]) {
  const params = new URLSearchParams();
  if (categoryIds.length === 0) {
    const response = await allProducts();
    return { success: true, data: response.data };
  }

  if (categoryIds.length > 0) {
    params.append("categories", categoryIds.join(","));
  }

  const response = await axios.get(
    `${GO_API_URL}/getbycategory${params.toString() ? `?${params.toString()}` : ""}`,
  );
  return { success: true, data: response.data };
}
