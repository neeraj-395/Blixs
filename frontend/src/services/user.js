import axios from "axios";
import { UserAPI } from "./routes";
import { refresh_callback } from "./refreshtok";

export const get_user = async () => {
  try {
    const response = await axios.get(UserAPI.current, { withCredentials: true });
    return response.data;
  } catch (error) {
    return refresh_callback(
      error,
      axios.get(UserAPI.current, { withCredentials: true })
    );
  }
};

