"use server";

import axios from "axios";
import { getToken } from "./token";
import { User } from "@/interface";

const GO_API_URL = process.env.GO_API_URL;

export async function getInfoUser() {
  try {
    const token = await getToken();
    const userInfo = await axios.get(`${GO_API_URL}/user`, {
      headers: { Cookie: `jwt=${token}` },
    });

    return {
      success: true,
      data: userInfo.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed get user",
    };
  }
}

export async function updateUser(payload: User) {
  try {
    if (
      !payload.email ||
      !payload.first_name ||
      !payload.last_name ||
      !payload.user_name
    ) {
      return { success: false, message: "Valid not required" };
    }

    const token = await getToken();

    const { data } = await axios.put(`${GO_API_URL}/updateuser`, payload, {
      headers: { Cookie: `jwt=${token}` },
    });

    return { success: true, data };
  } catch {
    return {
      success: false,
      message: "Failed update user",
    };
  }
}
