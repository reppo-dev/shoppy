"use server";

import axios from "axios";

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
