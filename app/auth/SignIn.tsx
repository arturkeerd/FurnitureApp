import Input from '@/components/ui/Input';
import MainButton from '@/components/ui/MainButton';
import Colors from '@/constants/Colors';
import MainView from '@/constants/MainView';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text, View, Alert , Platform } from 'react-native';
import AuthHeader from '@/components/ui/AuthHeader';
import * as SecureStore from "expo-secure-store";
import { useUser } from "@/hooks/UserContext";
import { saveToken } from "@/utils/token";           // use the shared util
import { API_URL } from "@/constants/config";        

/*async function saveToken(token: string) {
  try {
    if (Platform.OS === "web") {
      // Web fallback, since SecureStore doesn’t work in browsers
      localStorage.setItem("auth_token", token);
    } else {
      await SecureStore.setItemAsync("auth_token", token);
    }
  } catch (e: any) {
    console.warn("Token save failed:", e?.message);
  }
}*/

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refresh } = useUser();

  const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000";

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        const msg = data?.error || `Login failed (${res.status})`;
        Alert.alert("Error", msg);
        return;
      }

      // ✅ Save JWT securely
      await saveToken(data.token);

      // 2) Populate context by calling /api/auth/me
      await refresh();

      console.log("Logged in:", data.user);
      Alert.alert("Success", `Welcome back, ${data.user.name}!`);

      // Navigate to home after login
      router.replace("/home/Home");
    } catch (err: any) {
      Alert.alert("Network error", err?.message ?? "Could not reach server");
    } finally {
      setLoading(false);
    }
  };
  const signUp = () => router.push("/auth/SignUp");
  const goBack = () => router.push("/");
  const google = () => {}; // wire later

  return (
    <MainView>
      <View style={styles.headerContainer}>
        <AuthHeader title="Sign In" onPress={goBack} />
      </View>
      <View style={styles.container}>
          <Pressable>
            <Input
              label="E-mail"
              placeholder="example@gmail.com"
              value={email}
              onChangeText={setEmail}
            />
            <Input
                  label="Password"
                  placeholder="**********"
                  value={password}
                  onChangeText={setPassword}
                  isPassword={true}
                  isPasswordVisible={isPasswordVisible}
                  onEyePress={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              <Pressable onPress={handleLogin}>
                <MainButton style={{ marginTop: 40, marginBottom: 20 }}>
                  {loading ? "Signing in..." : "Sign In"}
                </MainButton>
              </Pressable>
                <View style={[styles.dividerContainer]}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.subText}>Or sign in with</Text>
                  <View style={styles.dividerLine} />
                </View>
              <Pressable onPress={google}>
                <Image style={styles.Gmail} source={require('@/assets/images/gmail.png')}/>
              </Pressable>
            <Text style={styles.signUp} onPress={signUp}>Don't have an account?  <Text style={{ fontWeight: '600' }}>Sign Up</Text></Text>
          </Pressable>
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  container:{
    width: '90%',
    alignSelf: 'center',
  },
  formLabel: {
    marginTop: 20,
    marginBottom:5,
  },
  subText: {
    top: 20,
    alignSelf: 'center',
    color: Colors.blue,
    height: 60,
    fontWeight: '600',
  },
  dividerContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    gap: 10,
  },
  dividerLine: {
    marginTop: 30,
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGrey,
  },
  formElementCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
    Gmail: {
    height: 60,
    width: 142,
    alignSelf: 'center'
  },
  signUp: {
    top: 40,
    textAlign: 'center',
    color: Colors.blue,
  },
});