"use server";

import axios from "axios";
import { getUserInfo } from "./getUserId";
import { Product } from "@/interface";

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
    const response = await axios.get(`${GO_API_URL}/getproduct/${id}`);

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
