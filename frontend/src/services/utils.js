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
  