import axios from "axios";

const BASE_URL = import.meta.env.BACKEND_URL;
const REFRESH_URL = BASE_URL + 'api/token/refresh/';

export const refresh_token = async () => {
    const res = await axios.post(REFRESH_URL, {}, { withCredentials: true });
    return res.data.refreshed || false;
};

export const refresh_callback = async (error, callback) => {
    if (error.response?.status === 401) {
      console.warn("Token expired. Attempting to refresh...");
  
      const token_refreshed = await refresh_token();
      if (token_refreshed) {
        console.log("Token refreshed. Retrying request...");
        try {
          const retry_response = await callback();
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