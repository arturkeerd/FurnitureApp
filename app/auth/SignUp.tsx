import AuthHeader from "@/components/ui/AuthHeader";
import Checkbox from "@/components/ui/CheckBox";
import Input from "@/components/ui/Input";
import MainButton from "@/components/ui/MainButton";
import Colors from "@/constants/Colors";
import MainView from "@/constants/MainView";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Platform, Pressable, StyleSheet, Text, View } from "react-native";

function getApiBase() {
  // Works for: web, iOS sim, Android emulator, and physical device on LAN
  const env = process.env.EXPO_PUBLIC_API_URL;
  if (env) return env;
  if (Platform.OS === "android") return "http://10.0.2.2:4000"; // Android emulator loopback
  return "http://localhost:4000"; // iOS sim / web
}

export default function SignUp() {
  const router = useRouter();
  const API_URL = getApiBase();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const goBack = () => router.push("/");
  const google = () => router.push("/"); // TODO: wire later
  const signIn = () => router.push("/auth/SignIn");

  const handleRegister = async () => {
    setFieldErrors({ name: "", email: "", password: "" });

      let hasError = false;

      // name
      if (!name.trim()) {
        hasError = true;
        setFieldErrors((prev) => ({ ...prev, name: "Name is required." }));
      }

      // email
      if (!email.trim()) {
        hasError = true;
        setFieldErrors((prev) => ({ ...prev, email: "Email is required." }));
      } else {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
          hasError = true;
          setFieldErrors((prev) => ({ ...prev, email: "Please enter a valid email." }));
        }
      }

      // password
      if (!password.trim()) {
        hasError = true;
        setFieldErrors((prev) => ({ ...prev, password: "Password is required." }));
      } else if (password.length < 6) {
        hasError = true;
        setFieldErrors((prev) => ({
          ...prev,
          password: "Password must be at least 6 characters.",
        }));
      }

      if (!checked) {
        Alert.alert("Agree to terms", "Please agree to the Terms & Privacy to continue.");
        // not a field error, just keep the alert
      }

      // Abort if any field failed
      if (hasError || !checked) return;

      // 🔽 your existing submit logic unchanged
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg = data?.error || `Registration failed (${res.status})`;
          Alert.alert("Error", msg);
          return;
        }

        Alert.alert("Success", "Account created. Please sign in.");
        router.push("/auth/SignIn");
      } catch (err: any) {
        Alert.alert("Network error", err?.message ?? "Could not reach server");
      } finally {
        setLoading(false);
      }
    };
  
  return (
    <MainView>
      <View style={styles.headerContainer}>
        <AuthHeader title="Sign Up" onPress={goBack} />
      </View>

      <View style={styles.container}>
<Input
  label="Name"
  placeholder="John Doe"
  value={name}
  onChangeText={(t) => {
    setName(t);
    if (fieldErrors.name) {
      setFieldErrors((prev) => ({ ...prev, name: "" }));
    }
  }}
/>
{fieldErrors.name ? <Text style={styles.errorText}>{fieldErrors.name}</Text> : null}

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
{fieldErrors.email ? <Text style={styles.errorText}>{fieldErrors.email}</Text> : null}

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

        <Checkbox
          style={{ maxWidth: 400, alignSelf: "center" }}
          checked={checked}
          onCheck={setChecked}
          title="I agree with Terms & Privacy"
        />

        <Pressable onPress={loading ? undefined : handleRegister}>
          <MainButton style={{ marginTop: 40, marginBottom: 20 }}>
        {loading ? <ActivityIndicator /> : "Sign Up"}
          </MainButton>
        </Pressable>

        <View style={styles.dividerContainer}>
          <View className="dividerLine" style={styles.dividerLine} />
          <Text style={styles.subText}>Or sign in with</Text>
          <View className="dividerLine" style={styles.dividerLine} />
        </View>

        <Pressable onPress={google}>
          <Image style={styles.Gmail} source={require("@/assets/images/gmail.png")} />
        </Pressable>

        <Text style={styles.signIn} onPress={signIn}>
          Already have an account? <Text style={{ fontWeight: "600" }}>Sign In</Text>
        </Text>
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({
  headerContainer: { width: "90%", maxWidth: 400, alignSelf: "center" },
  container: { width: "90%", alignSelf: "center" },
  subText: { top: 20, alignSelf: "center", color: Colors.blue, height: 60, fontWeight: "600" },
  dividerContainer: { width: "100%", maxWidth: 400, alignSelf: "center", flexDirection: "row", marginTop: 10, marginBottom: 10, gap: 10 },
  dividerLine: { marginTop: 30, flex: 1, height: 1, backgroundColor: Colors.lightGrey },
  Gmail: { height: 60, width: 142, alignSelf: "center" },
  signIn: { top: 40, textAlign: "center", color: Colors.blue },
  errorText: {
  color: "red",
  fontSize: 12,
  marginTop: -16,   // pull it closer to the input if you want
  marginBottom: 12,
  alignSelf: "center",
  maxWidth: 400,
  width: "90%",
},
});
