import axios from "axios";
import { ChatAPI } from "./routes";
import { handle_response } from "./utils";

export const get_chats = async (roomid, limit, offset) => 
  handle_response(() => axios.get(
    `${ChatAPI.chatlist(roomid)}?limit=${limit}&offset=${offset}`,
      { withCredentials:true }
  ));

export const get_chat_users = async (userid) =>
  handle_response(() => axios.get(ChatAPI.roomlist(userid), { withCredentials: true }));




