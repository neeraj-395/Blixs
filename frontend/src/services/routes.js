export const BASE_URL = 'http://127.0.0.1:8000/';
export const WS_URL = 'ws://127.0.0.1:8000/';

export const AuthAPI = {
  login: `${BASE_URL}users/auth/token/`,
  refresh: `${BASE_URL}users/auth/token/refersh/`,
  logout: `${BASE_URL}users/auth/logout/`,
  register: `${BASE_URL}users/auth/register/`,
  check: `${BASE_URL}users/auth/check/`,
};

export const UserAPI = {
  users: `${BASE_URL}users/`,
  user: `${BASE_URL}users/me/`,
};

export const PostAPI = {
  all: `${BASE_URL}posts/`,
  byuser: `${BASE_URL}posts/me/`,
};

export const ChatAPI = {
    usermsg: (userid) =>  `${BASE_URL}chats/users/${userid}/messages`,
    chatmsg: (chatid) => `${BASE_URL}chats/${chatid}/messages`,
};
  
