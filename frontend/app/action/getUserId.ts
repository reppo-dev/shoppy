"use server";

import axios from "axios";
import { cookies } from "next/headers";

const GO_API_URL = process.env.GO_API_URL;

export async function getUserInfo() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    const userInfo = await axios.get(`${GO_API_URL}/user`, {
      headers: { Cookie: `jwt=${token}` },
    });

    const userId = userInfo.data.ID;

    return { success: true, userId: userId };
  } catch {
    return {
      success: false,
      message: "somthing want wrong,Filed to get info user",
    };
  }
}
