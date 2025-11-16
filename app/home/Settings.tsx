import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import MainView from "@/constants/MainView";
import Colors from "@/constants/Colors";
import ProfileNavButton from "@/components/ui/ProfileNavButton";
import { useUser } from "@/hooks/UserContext";

export default function SettingsScreen() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <MainView header={<Header title="Settings" />} scroll={false}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollBody}
          showsVerticalScrollIndicator={false}
        >
          {/* Personal info */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.editIcon}>✎</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Name</Text>
            <Text style={styles.cardValue}>
              {user?.name ?? "Not set"}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Email</Text>
            <Text style={styles.cardValue}>
              {user?.email ?? "Not set"}
            </Text>
          </View>

          {/* Help center */}
          <Text style={[styles.sectionTitle, styles.helpTitle]}>
            Help Center
          </Text>

          <View style={styles.helpCards}>
            <ProfileNavButton
              title="FAQ"
              onPress={() => {
                // later: router.push("/home/Faq");
              }}
            />
            <View style={styles.spacer} />
            <ProfileNavButton
              title="Contact Us"
              onPress={() => {
                // later: router.push("/home/Contact");
              }}
            />
            <View style={styles.spacer} />
            <ProfileNavButton
              title="Privacy & Terms"
              onPress={() => {
                // later: router.push("/home/Privacy");
              }}
            />
          </View>
        </ScrollView>
        <Footer />
      </SafeAreaView>
    </MainView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollBody: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8a8a8a",
  },
  editIcon: {
    fontSize: 18,
    color: Colors.blue,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  cardLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.blue,
  },
  helpTitle: {
    marginTop: 24,
    marginBottom: 12,
  },
  helpCards: {
    gap: 0,
  },
  spacer: {
    height: 10,
  },
});