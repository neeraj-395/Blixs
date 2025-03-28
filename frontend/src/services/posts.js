import axios from "axios";
import { refresh_callback } from "./refreshtok";

const BASE_URL = "http://127.0.0.1:8000/";
const GET_POSTS_URL = BASE_URL + 'posts/';
const USER_POSTS_URL = BASE_URL + 'posts/user/';

export const get_posts = async () => {
    try {
      const response = await axios.get(GET_POSTS_URL, { withCredentials: true });
      return response.data;
    } catch (error) {
      return refresh_callback(error,
        axios.get(GET_POSTS_URL, { withCredentials: true })
      );
    }
};

export const get_user_posts = async () => {
    try {
      const response = await axios.get(USER_POSTS_URL, { withCredentials: true });
      return response.data;
    } catch (error) {
      return refresh_callback(error,
        axios.get(USER_POSTS_URL, { withCredentials: true })
      );
    }
  };