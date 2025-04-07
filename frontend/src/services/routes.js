export const BASE_URL = 'http://127.0.0.1:8000/';
export const WS_URL = 'ws://127.0.0.1:8000/';

export const AuthAPI = {
  login: `${BASE}users/token/`,
  logout: `${BASE}users/logout/`,
  register: `${BASE}users/register/`,
  isAuth: `${BASE}users/authenticated/`,
};

export const UserAPI = {
  current: `${BASE}users/user/`,
};

export const PostAPI = {
  all: `${BASE}posts/`,
  byUser: `${BASE}posts/user/`,
};

export const ChatAPI = (ServerURL) => ({
    userMsgs: (userid) => `${ServerURL}users/${userid}/messages`,
    chatMsgs: (chatid) => `${ServerURL}chats/${chatid}/messages`,
});
  
