import axios from "axios";
import { AuthAPI }  from "./routes";
import { handle_response } from "./utils";

export const register = async (userData) => 
  handle_response(() => axios.post(AuthAPI.register, userData));

export const login = async (username, password) => 
  handle_response(() => axios.post(AuthAPI.login, 
    { username, password }, { withCredentials: true }
  ));

export const logout = async () => 
  handle_response(() => axios.get(AuthAPI.logout, { withCredentials: true }));

export const is_authenticated = async () => 
  handle_response(() => axios.get(AuthAPI.check, { withCredentials: true }));

export const refresh_token = async () =>
  handle_response(() => axios.post(AuthAPI.refresh, {}, { withCredentials: true }));
