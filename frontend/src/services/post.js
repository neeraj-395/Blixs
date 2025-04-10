import axios from "axios";
import { PostAPI } from "./routes";
import { refresh_token } from "./auth"
import { handle_response, handle_retry_response } from "./utils";

export const get_posts = async () => 
  handle_response(() => axios.get(PostAPI.all, { withCredentials: true }));

export const get_user_posts = async () =>
  handle_retry_response(refresh_token,
    () => axios.get(PostAPI.byuser, { withCredentials: true })
  );