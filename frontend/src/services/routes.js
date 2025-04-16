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
  delete: `${BASE_URL}users/delete/`,
  edit: `${BASE_URL}users/edit/`,
  follow: (userid) => `${BASE_URL}users/${userid}/follow/toggle`
};

export const PostAPI = {
  all: `${BASE_URL}posts/`,
  byuser: `${BASE_URL}posts/me/`,
  create: `${BASE_URL}posts/me/create/`,
  delete: (postid) => `${BASE_URL}posts/${postid}/delete/`,
  like: (postid) => `${BASE_URL}posts/${postid}/like/toggle/`, 
};

export const CommentAPI = {
  create: (postid) => `${BASE_URL}posts/${postid}/comment/`,
  delete: (cmntid) => `${BASE_URL}comments/${cmntid}/delete/`
}

export const ChatAPI = {
  roomlist: (userid) =>  `${BASE_URL}chats/users/${userid}/messages`,
  chatlist: (roomid) => `${BASE_URL}chats/${roomid}/messages`,
};
  
