import axios from "axios";
import { getToken } from "./token";

const GO_API_URL = process.env.GO_API_URL;

export async function getInfoUser() {
  try {
    const token = await getToken();
    const userInfo = await axios.get(`${GO_API_URL}/user`, {
      headers: { Cookie: `jwt=${token}` },
    });

    return userInfo.data;
  } catch {
    return {
      success: false,
      message: "Failed get user",
    };
  }
}
