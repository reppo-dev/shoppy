// app/action/product.ts (اضافه کردن تابع جدید)
"use server";

import axios from "axios";
import { cookies } from "next/headers";

const GO_API_URL = process.env.GO_API_URL;

export async function getProductsByCategories(categoryIds: number[]) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;
    const headers: Record<string, string> = {};
    if (token) headers.Cookie = `jwt=${token}`;

    const params = new URLSearchParams();
    if (categoryIds.length > 0) {
      params.append("categories", categoryIds.join(","));
    }

    const url = `${GO_API_URL}/products${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await axios.get(url, { headers });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("getProductsByCategories error:", error);
    return { success: false, data: [] };
  }
}
