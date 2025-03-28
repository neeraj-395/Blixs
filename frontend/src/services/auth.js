import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/";
const LOGIN_URL = BASE_URL + 'users/token/';
const LOGOUT_URL = BASE_URL + 'users/logout/';
const REGISTER_URL = BASE_URL + 'users/register/';
const ISAUTH_URL = BASE_URL + 'users/authenticated/'

export const register = async (userData) => {
    try {
      const response = await axios.post(REGISTER_URL, userData);
      console.log("Registration Success: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration Failed: ", error.response?.data || error.message);
      return false;
    }
};

export const login = async (username, password) => {
    try {
      const res = await axios.post(LOGIN_URL,
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
      const response = await axios.post(LOGOUT_URL, {},
        { withCredentials: true }
      );
      return response.data.logout_success;
    } catch (error) {
      console.error("Logout API error:", error);
      return false;
    }
};

export const is_authenticated = async () => {
  try {
    const response = await axios.get(ISAUTH_URL, 
      {withCredentials: true}
    );
    return response.data.success;
  } catch (error) {
    return false;
  }
}