import axios from "axios";
import Cookies from "js-cookie";

const BASE_API = "http://127.0.0.1:8000/";

const LOGIN_URL = `${BASE_API}api/token/`;
const REFRESH_URL = `${BASE_API}api/token/refresh/`;
const LOGOUT_URL = `${BASE_API}api/logout/`;
const AUTH_URL = `${BASE_API}api/authenticated/`;
const ALL_POST_URL = `${BASE_API}api/posts/`;
const USER_URL = `${BASE_API}api/user/`;
const SELF_POST_URL = `${BASE_API}api/posts/self/`;
const REGISTER = `${BASE_API}api/register/`;

export const user = async () => {
  try {
    const response = await axios.get(USER_URL, { withCredentials: true });
    console.log("User Info :  ", response.data);
    return response.data;
  } catch (error) {
    return call_refresh(
      error,
      axios.get(USER_URL, { withCredentials: true })
    );
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(REGISTER, userData);
    console.log("Registration Success: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Registration Failed: ", error.response?.data || error.message);
    return false;
  }
};

export const get_all_post = async () => {
  try {
    const response = await axios.get(ALL_POST_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    return call_refresh(
      error,
      axios.get(ALL_POST_URL, { withCredentials: true })
    );
  }
};

export const get_self_post = async () => {
  try {
    const response = await axios.get(SELF_POST_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    return call_refresh(
      error,
      axios.get(SELF_POST_URL, { withCredentials: true })
    );
  }
};

export const login_try = async (username, password) => {
  try {
    const res = await axios.post(
      LOGIN_URL,
      { username, password },
      { withCredentials: true }
    );
    return res.data.success;
  } catch (error) {
    console.error("Login API error:", error);
    return false;
  }
};

export const logout_try = async () => {
  try {
    const response = await axios.post(
      LOGOUT_URL,
      {},
      { withCredentials: true }
    );
    return response.data.logout_success;
  } catch (error) {
    console.error("Logout API error:", error);
    return false;
  }
};

export const refresh_token = async () => {
  const res = await axios.post(REFRESH_URL, {}, { withCredentials: true });
  return res.data.refreshed || false;
};

export const call_refresh = async (error, fun) => {
  if (error.response?.status === 401) {
    console.warn("Token expired. Attempting to refresh...");

    const token_refreshed = await refresh_token();
    if (token_refreshed) {
      console.log("Token refreshed. Retrying request...");
      try {
        const retry_response = await fun();
        return retry_response?.data;
      } catch (retryError) {
        console.error("Retry failed:", retryError.response?.data || retryError.message);
        return false;
      }
    } else {
      console.error("Token refresh failed. User might need to re-login.");
      return false;
    }
  }

  console.error("Error during request:", error.response?.data || error.message);
  return false;
};

export const is_authenticated = async () => {
  try {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) return false;
    await axios.post(AUTH_URL, { withCredentials: true });
    return true;
  } catch (error) {
    return false;
  }
};

export default { login_try, refresh_token, call_refresh, is_authenticated };
