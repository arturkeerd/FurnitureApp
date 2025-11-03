import * as SecureStore from "expo-secure-store";
const KEY = "auth_token";
export const saveToken = (t: string) => SecureStore.setItemAsync(KEY, t);
export const getToken  = () => SecureStore.getItemAsync(KEY);
export const clearToken = () => SecureStore.deleteItemAsync(KEY);
export const authFetch = async (path: string, init?: RequestInit) => {
  const token = await getToken();
  return json(path, {
    ...(init||{}),
    headers: { ...(init?.headers||{}), Authorization: `Bearer ${token}` }
  });
};
import { json } from "./api";