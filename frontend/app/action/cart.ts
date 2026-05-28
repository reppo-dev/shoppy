"use server";

import axios from "axios";
import { getToken } from "./token";

const GO_API_URL = process.env.GO_API_URL;

export async function getCart() {
  try {
    const token = await getToken();
    if (!token) {
      return { success: false, message: "Not authenticated" };
    }
    const response = await axios.get(`${GO_API_URL}/getcart`, {
      headers: {
        Cookie: `jwt=${token}`,
      },
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
    const token = await getToken();
    if (!token) {
      return { success: false, message: "Not authenticated" };
    }

    const response = await axios.post(
      `${GO_API_URL}/addtocart`,
      { product_id: productId, quantity },
      {
        headers: {
          Cookie: `jwt=${token}`,
        },
      },
    );

    return {
      success: true,
      message: response.data.message || "Added to cart",
    };
  } catch (error) {
    console.error("AddToCart error:", error);
    return {
      success: false,
      message: "Failed add to cart",
    };
  }
}

export async function deleteCardItem() {
  try {
    const token = await getToken();
    if (!token) {
      return { success: false, message: "Not authenticated" };
    }
    await axios.delete(`${GO_API_URL}/deletecartitem`, {
      headers: {
        Cookie: `jwt=${token}`,
      },
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

export async function removeCartItem(itemId: number) {
  try {
    await axios.delete(`${GO_API_URL}/deletecartitem/${itemId}`);
    return {
      success: true,
      message: "Item deleted",
    };
  } catch {
    return {
      success: false,
      message: "Failed delete item",
    };
  }
}
