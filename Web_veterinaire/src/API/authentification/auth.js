
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const URLBase = import.meta.env.VITE_API_BASE_URL;
export const TOKEN_NAME = "projectVetToken";

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(`${URLBase}/user/login`, { email, password });
    const decoded = jwtDecode(res.data);
    console.log(decoded);
    return {
      id: decoded.id,
      status: decoded.status,
      token: res.data,
      exp: decoded.exp,
    };
  } catch (error) {
    throw error;
  }
};
