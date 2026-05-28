"use server";

import axios from "axios";

const GO_API_URL = process.env.GO_API_URL;

export async function allorder() {
  try {
    const response = await axios.get(`${GO_API_URL}/allorders`);
    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed to get all orders",
    };
  }
}

export async function alluserorder() {
  try {
    const response = await axios.get(`${GO_API_URL}//alloruserders`, {
      withCredentials: true,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed to get all orders",
    };
  }
}

export async function createorder() {
  try {
    await axios.post(`${GO_API_URL}/createorder`, { withCredentials: true });
    return {
      success: true,
      message: "success to add order",
    };
  } catch {
    return {
      success: false,
      message: "Failed to add order",
    };
  }
}
