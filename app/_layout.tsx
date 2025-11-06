import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { UserProvider } from "@/hooks/UserContext"; // ✅ move context to /contexts, not /hooks

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {

  return (
    <UserProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
        </Stack>
        <StatusBar style="auto" />
    </UserProvider>
  );
}