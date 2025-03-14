import axios from "axios";
import Cookies from "js-cookie";

const BASE_API = "http://127.0.0.1:8000/";

const LOGIN_URL = `${BASE_API}api/token/`;
const REFRESH_URL = `${BASE_API}api/token/refresh/`;
const LOGOUT_URL = `${BASE_API}api/logout/`;
const AUTH_URL = `${BASE_API}api/authenticated/`;
const ALL_POST_URL = `${BASE_API}api/posts/`;
const SELF_POST_URL = `${BASE_API}api/posts/self/`;

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

export const refresh_token = () => {
  const res = axios.post(REFRESH_URL, {}, { withCredentials: true });
  return res.data.refreshed;
};

export const call_refresh = async (error, fun) => {
  if (error.response || error.response.status === 401) {
    const token_refreshed = await refresh_token();

    if (token_refreshed) {
      const retry_response = await fun();
      return retry_response.data;
    }
  }
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
