import axios from "axios";
import { AuthAPI }  from "./routes";

export const register = async (userData) => {
    try {
      const response = await axios.post(AuthAPI.register, userData);
      return response.data;
    } catch (error) {
      console.error("Registration Failed: ", error.response?.data || error.message);
      return false;
    }
};

export const login = async (username, password) => {
    try {
      const res = await axios.post(AuthAPI.login,
        { username, password },
        { withCredentials: true }
      );
      return res.data.success;
    } catch (error) {
      console.error("Login API error:", error);
      return false;
    }
};

export const logout = async () => {
    try {
      const response = await axios.post(AuthAPI.logout, {},
        { withCredentials: true }
      );
      return response.data.success;
    } catch (error) {
      console.error("Logout API error:", error);
      return false;
    }
};

export const is_authenticated = async () => {
  try {
    const response = await axios.get(AuthAPI.isAuth, 
      {withCredentials: true}
    );
    return response.data;
  } catch (error) {
    return false;
  }
}