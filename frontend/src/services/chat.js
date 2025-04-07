import { BASE_URL, ChatAPI } from "./routes";

export const get_chats = async (chatid) => {
  return await axios.get(ChatAPI(BASE_URL).chatMsgs(chatid) + 'limit=20&offset=0');
}

export const get_chat_users = async (userid) => {
  return await axios.get(ChatAPI(BASE_URL).userMsgs(userid));
}




