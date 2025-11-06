import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Footer from "@/components/ui/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import MainView from "@/constants/MainView";
import Header from "@/components/ui/Header";

export default function Favourites() {
  const router = useRouter();

  return (
    <MainView
      header={
        <Header
          title="Favourites"
        />
      }
    scroll={false}
    >
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Placeholder Page</Text>
            <Button title="Go Back" onPress={() => router.back()} />
        </SafeAreaView>
        <Footer/>
    </MainView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});