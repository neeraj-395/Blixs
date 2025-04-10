import { ChatAPI } from "./routes";
import { handle_response } from "./utils";

export const get_chats = async (chatid, limit, offset) => 
  handle_response(() => axios.get(
    `${ChatAPI.chatmsg(chatid)}?limit=${limit}&offset=${offset}`
  ));

export const get_chat_users = async (userid) =>
  handle_response(() => axios.get(ChatAPI.usermsg(userid)));




