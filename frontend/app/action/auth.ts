"use server";
import { Login, Register } from "@/interface";
import axios from "axios";
import { cookies } from "next/headers";

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

    if (!token) {
      return { success: false, message: "No token received from server." };
    }

    const cookieStore = await cookies();
    cookieStore.set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return { success: true, message: "Signup successful." };
  } catch {
    return {
      success: false,
      message: "Failed to sign up",
    };
  }
}

export async function login(payload: Login) {
  try {
    if (!payload.email || !payload.password) {
      return {
        success: false,
        message: "Valid not required",
      };
    }
    const response = await axios.post(`${GO_API_URL}/login`, payload);

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

    if (!token) {
      return { success: false, message: "No token received from server." };
    }

    const cookieStore = await cookies();
    cookieStore.set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return { success: true, message: "Login successful." };
  } catch {
    return {
      success: false,
      message: "email or password is wrong",
    };
  }
}

export async function logout() {
  try {
    const response = await axios.post(
      `${GO_API_URL}/logout`,
      {},
      {
        withCredentials: true,
      },
    );

    const cookieStore = await cookies();
    cookieStore.delete("jwt");
    console.log("Logout response:", response.data);
    return {
      success: true,
      message: "user logouted",
    };
  } catch {
    return {
      success: false,
      message: "Failed logout user",
    };
  }
}
