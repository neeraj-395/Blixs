import axios from "axios";
import { PostAPI } from "./routes";
import { refresh_callback } from "./refreshtok";

export const get_posts = async () => {
    try {
      const response = await axios.get(PostAPI.all, { withCredentials: true });
      return response.data;
    } catch (error) {
      return refresh_callback(error,
        axios.get(PostAPI.all, { withCredentials: true })
      );
    }
};

export const get_user_posts = async () => {
    try {
      const response = await axios.get(PostAPI.byUser, { withCredentials: true });
      return response.data;
    } catch (error) {
      return refresh_callback(error,
        axios.get(PostAPI.byUser, { withCredentials: true })
      );
    }
  };