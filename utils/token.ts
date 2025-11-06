import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const KEY = "auth_token";

export async function saveToken(token: string) {
  if (Platform.OS === "web") localStorage.setItem(KEY, token);
  else await SecureStore.setItemAsync(KEY, token);
}
export async function getToken() {
  return Platform.OS === "web" ? localStorage.getItem(KEY) : await SecureStore.getItemAsync(KEY);
}
export async function clearToken() {
  if (Platform.OS === "web") localStorage.removeItem(KEY);
  else await SecureStore.deleteItemAsync(KEY);
}