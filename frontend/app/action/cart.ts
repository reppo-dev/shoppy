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
