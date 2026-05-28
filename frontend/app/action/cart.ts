"use server";

import axios from "axios";

const GO_API_URL = process.env.GO_API_URL;

export async function getCart() {
  try {
    const response = await axios.get(`${GO_API_URL}/getcart`, {
      withCredentials: true,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed get cart",
    };
  }
}

export async function addToCart(productId: number, quantity: number = 1) {
  try {
    const response = await axios.post(
      `${GO_API_URL}/addtocart`,
      {
        product_id: productId,
        quantity,
      },
      { withCredentials: true },
    );

    return {
      success: true,
      message: response.data.message || "Added to cart",
    };
  } catch {
    return {
      success: false,
      message: "Failed add to cart",
    };
  }
}

export async function deleteCardItem() {
  try {
    await axios.delete(`${GO_API_URL}/deletecartitem`, {
      withCredentials: true,
    });

    return {
      success: true,
      message: "success delete cart",
    };
  } catch {
    return {
      success: false,
      message: "Failed delete cart",
    };
  }
}
