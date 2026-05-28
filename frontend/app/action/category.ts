"use server";

import axios from "axios";

const GO_API_URL = process.env.GO_API_URL;

export async function getCategories() {
  try {
    const response = await axios.get(`${GO_API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
