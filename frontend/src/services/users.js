import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/";
const USER_URL = BASE_URL + 'users/user/';

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

