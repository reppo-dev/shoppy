"use server";

import { cookies } from "next/headers";

export async function getToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    return token;
  } catch {
    return {
      success: false,
      message: "we can get token",
    };
  }
}
