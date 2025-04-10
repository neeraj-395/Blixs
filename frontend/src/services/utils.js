export const handle_response = async (api_callback) => {
    try {
      const response = await api_callback();
      return response?.data;
    } catch (error) {
      const err = error.response?.data || { message: error.message };
      console.error('API Error:', err);
      return { success: false, error: err };
    }
  };
  
const retry_callback = async (error, refresh_token, api_callback) => {
  if (error.response?.status === 401) {
    console.warn("Token expired. Attempting to refresh...");

    const refresh_response = await refresh_token();
    if (refresh_response.success) {
      console.log("Token refreshed. Retrying request...");
      return await handle_response(api_callback);
    } else {
      console.error("Token refresh failed. User might need to re-login.");
      return refresh_response;
    }
  }

  const err = error.response?.data || { message: error.message };
  console.error("Request failed:", err);
  return { success: false, error: err };
};
  
export const handle_retry_response = async (refresh_token, api_callback) => {
  try {
    const response = await api_callback();
    return response?.data;
  } catch (error) {
    return await retry_callback(error, refresh_token, api_callback);
  }
};
  