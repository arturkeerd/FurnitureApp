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

  const goBack = () => router.push("/");
  const google = () => router.push("/"); // TODO: wire later
  const signIn = () => router.push("/auth/SignIn");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Missing fields", "Please fill name, email and password.");
      return;
    }
    if (!checked) {
      Alert.alert("Agree to terms", "Please agree to the Terms & Privacy to continue.");
      return;
    }

    try {
      setLoading(true);
      console.log("Sending:", { name, email, password, API_URL });
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

      // Optionally store token in secure storage here
      // await SecureStore.setItemAsync("token", data.token);

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
          onChangeText={setName}
        />
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
          isPassword
          isPasswordVisible={isPasswordVisible}
          onEyePress={() => setIsPasswordVisible(v => !v)}
        />

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
});
