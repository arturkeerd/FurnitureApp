import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

type ProfileNavItemProps = {
  title: string;
  subtitle?: string;
  onPress: () => void;
};

export default function ProfileNavButton({ title, subtitle, onPress }: ProfileNavItemProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 130,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.blue ,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#808080' ,
  },
  chevron: {
    fontSize: 40,
    lineHeight: 26,
    fontWeight: 300,
    color: Colors.blue ,
  },
});