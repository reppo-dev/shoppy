"use server";

import axios from "axios";
import { getToken } from "./token";

const GO_API_URL = process.env.GO_API_URL;

const authHeaders = (token: string) => ({
  Cookie: `jwt=${token}`,
  "Content-Type": "application/json",
});

export async function getCart() {
  try {
    const token = await getToken();
    if (!token) return { success: false, message: "Not authenticated" };

    const response = await axios.get(`${GO_API_URL}/getcart`, {
      headers: authHeaders(token),
    });

    const { items, total } = response.data;
    return {
      success: true,
      data: { items: items ?? [], total: total ?? 0 },
    };
  } catch {
    return { success: false, message: "Failed get cart" };
  }
}

export async function addToCart(productId: number, quantity: number = 1) {
  try {
    const token = await getToken();
    if (!token) return { success: false, message: "Not authenticated" };

    const response = await axios.post(
      `${GO_API_URL}/addtocart`,
      JSON.stringify({ product_id: productId, quantity }),
      { headers: authHeaders(token) },
    );

    return { success: true, message: response.data.message || "Added to cart" };
  } catch (error) {
    console.error("AddToCart error:", error);
    return { success: false, message: "Failed add to cart" };
  }
}

export async function updateCartItem(id: number, quantity: number) {
  try {
    const token = await getToken();
    if (!token) return { success: false, message: "Not authenticated" };

    const res = await axios.put(
      `${GO_API_URL}/updatecartitem/${id}`,
      JSON.stringify({ quantity }),
      { headers: authHeaders(token) },
    );

    return { success: true, data: res.data };
  } catch (error) {
    console.error("Update error:", error);
    return { success: false, message: "Failed update cart item" };
  }
}

export async function removeCartItem(itemId: number) {
  try {
    const token = await getToken();
    if (!token) return { success: false, message: "Not authenticated" };

    await axios.delete(`${GO_API_URL}/deletecartitem/${itemId}`, {
      headers: authHeaders(token),
    });

    return { success: true, message: "Item deleted" };
  } catch {
    return { success: false, message: "Failed delete item" };
  }
}
