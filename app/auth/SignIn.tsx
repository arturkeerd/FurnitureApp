import Input from "@/components/ui/Input";
import MainButton from "@/components/ui/MainButton";
import Colors from "@/constants/Colors";
import MainView from "@/constants/MainView";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
} from "react-native";
import AuthHeader from "@/components/ui/AuthHeader";
import { useUser } from "@/hooks/UserContext";
import { saveToken } from "@/utils/token";
import { API_URL } from "@/constants/config";

export default function SignIn() {
  const router = useRouter();
  const { refresh } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    // reset old errors
    setFieldErrors({ email: "", password: "" });
    let hasError = false;

    // email
    if (!email.trim()) {
      hasError = true;
      setFieldErrors((prev) => ({ ...prev, email: "Email is required." }));
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        hasError = true;
        setFieldErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email.",
        }));
      }
    }

    // password
    if (!password.trim()) {
      hasError = true;
      setFieldErrors((prev) => ({
        ...prev,
        password: "Password is required.",
      }));
    }

    if (hasError) return;

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

      await saveToken(data.token);
      await refresh();

      Alert.alert("Success", `Welcome back, ${data.user.name}!`);
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
            onChangeText={(text) => {
              setEmail(text);
              if (fieldErrors.email) {
                setFieldErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
          />
          {fieldErrors.email ? (
            <Text style={styles.errorText}>{fieldErrors.email}</Text>
          ) : null}

          <Input
            label="Password"
            placeholder="**********"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (fieldErrors.password) {
                setFieldErrors((prev) => ({ ...prev, password: "" }));
              }
            }}
            isPassword
            isPasswordVisible={isPasswordVisible}
            onEyePress={() => setIsPasswordVisible((v) => !v)}
          />
          {fieldErrors.password ? (
            <Text style={styles.errorText}>{fieldErrors.password}</Text>
          ) : null}

          <Pressable onPress={loading ? undefined : handleLogin}>
            <MainButton style={{ marginTop: 40, marginBottom: 20 }}>
              {loading ? "Signing in..." : "Sign In"}
            </MainButton>
          </Pressable>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.subText}>Or sign in with</Text>
            <View style={styles.dividerLine} />
          </View>

          <Pressable onPress={google}>
            <Image
              style={styles.Gmail}
              source={require("@/assets/images/gmail.png")}
            />
          </Pressable>

          <Text style={styles.signUp} onPress={signUp}>
            Don't have an account?{" "}
            <Text style={{ fontWeight: "600" }}>Sign Up</Text>
          </Text>
        </Pressable>
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "90%",
    maxWidth: 400,
    alignSelf: "center",
  },
  container: {
    width: "90%",
    alignSelf: "center",
  },
  subText: {
    top: 20,
    alignSelf: "center",
    color: Colors.blue,
    height: 60,
    fontWeight: "600",
  },
  dividerContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    flexDirection: "row",
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
  Gmail: {
    height: 60,
    width: 142,
    alignSelf: "center",
  },
  signUp: {
    top: 40,
    textAlign: "center",
    color: Colors.blue,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
    alignSelf: "center",
    maxWidth: 400,
    width: "90%",
  },
});