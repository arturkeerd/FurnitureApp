import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import ProfileNavButton from "@/components/ui/ProfileNavButton";
import Colors from "@/constants/Colors";
import { API_URL } from "@/constants/config";
import MainView from "@/constants/MainView";
import { useUser } from "@/hooks/UserContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, loading, logout } = useUser();
  const [myListingCount, setMyListingCount] = useState(0);

  useEffect(() => {
  const loadListings = async () => {
    if (!user?.id) {
      setMyListingCount(0);
      return;
    }

    const res = await fetch(`${API_URL}/api/items?seller=${user.id}`);
    if (!res.ok) {
      console.warn("Failed to load my listings count", res.status);
      return;
    }

    const items = await res.json();
    setMyListingCount(items.length);
  };

  loadListings();
}, [user?.id]);

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
            subtitle={`Already have ${myListingCount} listings`}
            onPress={() => router.push({pathname: "/home/MyListings",})}
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
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
  },
  email: {
    fontSize: 14,
    color: '#808080',
    marginBottom: 10,
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