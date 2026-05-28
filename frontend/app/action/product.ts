"use server";

import axios from "axios";
import { Product } from "@/interface";
import { getToken } from "./token";

const GO_API_URL = process.env.GO_API_URL;

export async function allProducts() {
  try {
    const respons = await axios.get(`${GO_API_URL}/allproducts`);

    return {
      success: true,
      data: respons.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed to get all products",
    };
  }
}

export async function getProduct(id: number) {
  try {
    const response = await axios.get(`${GO_API_URL}/products/${id}`);

    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed get product",
    };
  }
}

export async function createProduct(payload: Product) {
  try {
    if (
      !payload.name ||
      !payload.price ||
      !payload.description ||
      !payload.image
    ) {
      return { success: false, message: "Valid not required" };
    }

    await axios.post(`${GO_API_URL}/createproduct`, payload);

    return {
      success: true,
      message: "Create product success",
    };
  } catch {
    return {
      success: false,
      message: "Failed create product",
    };
  }
}

export async function updateProduct(payload: Product, id: number) {
  try {
    if (
      !payload.name ||
      !payload.price ||
      !payload.description ||
      !payload.image
    ) {
      return { success: false, message: "Valid not required" };
    }
    await axios.put(`${GO_API_URL}//updateproduct/${id}`, payload);

    return {
      success: true,
      message: "updated product",
    };
  } catch {
    return {
      success: false,
      message: "Failed update product",
    };
  }
}

export async function deleteProduct(id: number) {
  try {
    await axios.delete(`${GO_API_URL}/deleteproduct/${id}`);

    return { success: true, message: "Success to delete product" };
  } catch {
    return {
      success: false,
      message: "Failed delete product",
    };
  }
}

export async function getProductsByCategories(categoryIds: number[]) {
  try {
    const token = await getToken();
    const headers: Record<string, string> = {};
    if (token) headers.Cookie = `jwt=${token}`;

    if (categoryIds.length === 0) {
      const response = await axios.get(`${GO_API_URL}/products`, { headers });
      return { success: true, data: response.data };
    }

    const params = new URLSearchParams();
    params.append("categories", categoryIds.join(","));

    const response = await axios.get(`${GO_API_URL}/getbycategory`, {
      params,
      headers,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("getProductsByCategories error:", error);
    return { success: false, data: [], error: "Failed to fetch" };
  }
}
