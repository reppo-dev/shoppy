"use server";

import axios from "axios";

const GO_API_URL = process.env.GO_API_URL;

export async function getCart() {
  try {
    const response = await axios.get(`${GO_API_URL}/getcart`);

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

export async function addToCart() {
  try {
    const response = await axios.post(`${GO_API_URL}/addtocart`);

    return {
      success: true,
      message: "success add to cart",
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
    await axios.delete(`${GO_API_URL}/deletecartitem`);

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
