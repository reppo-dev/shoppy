"use server";
import { Register } from "@/interface";
import axios from "axios";

const GO_API_URL = process.env.GO_API_URL;

export async function registr(payload: Register) {
  try {
    if (
      !payload.user_name ||
      !payload.email ||
      !payload.password ||
      !payload.password_confirm
    ) {
      return {
        success: false,
        message: "Valid not required",
      };
    }
    const response = await axios.post(`${GO_API_URL}/register`, payload);

    let token = response.data?.token;

    if (!token) {
      const setCookie = response.headers["set-cookie"];
      if (setCookie && Array.isArray(setCookie)) {
        const jwtCookie = setCookie.find((c) => c.startsWith("jwt="));
        if (jwtCookie) {
          token = jwtCookie.split(";")[0].split("=")[1];
        }
      }
    }
    return {
      success: true,
    };
  } catch {}
}
