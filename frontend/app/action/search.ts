"use server";

import axios from "axios";

const GO_API_URL = process.env.GO_API_URL;

export async function searchProducts(q: string, categoryIds: number[] = []) {
  try {
    const params = new URLSearchParams();
    if (q.trim()) params.append("q", q.trim());
    if (categoryIds.length > 0)
      params.append("categories", categoryIds.join(","));

    const response = await axios.get(
      `${GO_API_URL}/search?${params.toString()}`,
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Search error:", error);
    return { success: false, data: [] };
  }
}
