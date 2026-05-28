"use server";

import axios from "axios";
import { getToken } from "./token";

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
  try {
    const token = await getToken();
    const headers: Record<string, string> = {};
    if (token) headers.Cookie = `jwt=${token}`;

    const params = new URLSearchParams();
    if (categoryIds.length > 0) {
      params.append("categories", categoryIds.join(","));
    }

    const response = await axios.get(
      `${GO_API_URL}/getbycategory${params.toString() ? `?${params.toString()}` : ""}`,
      { headers },
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("getProductsByCategories error:", error);
    return { success: false, data: [] };
  }
}
