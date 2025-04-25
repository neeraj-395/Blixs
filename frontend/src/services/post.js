import axios from "axios";
import { CommentAPI, PostAPI } from "./routes";
import { refresh_token } from "./auth"
import { handle_response, handle_retry_response } from "./utils";

export const get_posts = async () => 
  handle_response(() => axios.get(PostAPI.all, { withCredentials: true }));

export const get_user_posts = async () =>
  handle_retry_response(refresh_token,
    () => axios.get(PostAPI.byuser, { withCredentials: true })
  );

export const create_post = async (data) =>
  handle_response(() => axios.post(PostAPI.create, data, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true 
    })
  );

export const delete_post = async (postid) =>
  handle_response(() => axios.delete(PostAPI.delete(postid), { withCredentials: true }))

export const like_post = async (postid) =>
  handle_response(() => axios.get(PostAPI.like(postid), { withCredentials: true }));

export const create_comment = async (postid, data) => 
  handle_response(() => axios.post(CommentAPI.create(postid), data, { withCredentials: true }));

export const delete_comment = async (postid) =>
  handle_response(() => axios.delete(CommentAPI.delete(postid), { withCredentials: true }));