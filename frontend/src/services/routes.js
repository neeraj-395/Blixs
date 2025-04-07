export const BASE_URL = 'http://127.0.0.1:8000/';
export const WS_URL = 'ws://127.0.0.1:8000/';

export const AuthAPI = {
  login: `${BASE}user/auth/token/`,
  refresh: `${BASE}user/auth/token/refersh/`,
  logout: `${BASE}user/auth/logout/`,
  register: `${BASE}user/auth/register/`,
  isAuth: `${BASE}user/auth/check/`,
};

export const UserAPI = {
  all: `${BASE}user/all/`,
  current: `${BASE}user/`,
};

export const PostAPI = {
  all: `${BASE}post/all/`,
  byUser: `${BASE}post/user/all/`,
};

export const ChatAPI = (ServerURL) => ({
    userMsgs: (userid) => `${ServerURL}chat/users/${userid}/messages`,
    chatMsgs: (chatid) => `${ServerURL}chat/${chatid}/messages`,
});
  
