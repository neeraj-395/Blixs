export const BASE_URL = 'http://127.0.0.1:8000/';
export const WS_URL = 'ws://127.0.0.1:8000/';

export const AuthAPI = {
  login: `${BASE_URL}user/auth/token/`,
  refresh: `${BASE_URL}user/auth/token/refersh/`,
  logout: `${BASE_URL}user/auth/logout/`,
  register: `${BASE_URL}user/auth/register/`,
  isAuth: `${BASE_URL}user/auth/check/`,
};

export const UserAPI = {
  all: `${BASE_URL}user/all/`,
  current: `${BASE_URL}user/`,
};

export const PostAPI = {
  all: `${BASE_URL}post/all/`,
  byUser: `${BASE_URL}post/user/all/`,
};

export const ChatAPI = (ServerURL) => ({
    userMsgs: (userid) => `${ServerURL}chat/users/${userid}/messages`,
    chatMsgs: (chatid) => `${ServerURL}chat/${chatid}/messages`,
});
  
