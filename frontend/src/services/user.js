import axios from "axios";
import { UserAPI } from "./routes";
import { handle_response } from "./utils";


export const get_user = async () => 
  handle_response(() => axios.get(UserAPI.user, { withCredentials: true }));

export const get_users = async () =>
  handle_response(() => axios.get(UserAPI.users, { withCredentials: true }));

export const edit_user = async (data) => 
  handle_response(() => axios.put(UserAPI.edit, data, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true
  }));

export const delete_user = async () => 
  handle_response(() => axios.delete(UserAPI.delete, { withCredentials: true }));

export const follow_toggle = async(userid) => 
  handle_response(() => axios.get(UserAPI.follow(userid), { withCredentials: true }));
