import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import MainView from "@/constants/MainView";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Colors from "@/constants/Colors";
import ProfileNavButton from "@/components/ui/ProfileNavButton";
import { useUser, UserProvider, } from "@/hooks/UserContext";

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, loading, logout } = useUser();

  return (
    <MainView
      header={
        <Header
          title="Profile"
          showLogout
          onLogout={logout}
        />
      }
      scroll={false}
    >
      <SafeAreaView style={styles.container}>
        {/* User block */}
        <View style={styles.userBlock}>
          <Text style={styles.name}>
            {loading ? "Loading..." : user?.name ?? "Guest User"}
          </Text>
          <Text style={styles.email}>
            {loading ? "" : user?.email ?? "Not logged in"}
          </Text>
        </View>

        {/* Cards */}
        <View style={styles.cards}>
          <ProfileNavButton
            title="My Listings"
            subtitle="Already have 10 listing"
            onPress={() => router.push("/home/MyListings")}
          />
          <View style={{ height: 12 }} />
          <ProfileNavButton
            title="Settings"
            subtitle="Account, FAQ, Contact"
            onPress={() => router.push("/home/Settings")}
          />
        </View>

        {/* CTA pinned above footer */}
        <View style={[styles.bottomButton, { paddingBottom: insets.bottom + 12 }]}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.mainButton}
            onPress={() => router.push("/home/AddListing")}
          >
            <Text style={styles.buttonText}>Add a new listing</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Footer/>
    </MainView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Top: user
  userBlock: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    color: Colors.grey,
  },
  // Cards
  cards: {
    paddingHorizontal: 16,
  },
  bottomButton: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 30,
    paddingHorizontal: 25,
    marginVertical: 10,
    alignItems: "center",
  },
  mainButton: {
    marginTop: 20,
    backgroundColor: Colors.blue,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 70,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.2,
  },
  footerFix: {

  },
});