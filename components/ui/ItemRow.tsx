import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Colors from "@/constants/Colors";

// minimal shape ItemRow needs
export type ItemRowData = {
  title: string;
  price: string | number;
  image?: string | string[];
  images?: string[];
};

type ItemRowProps = {
  item: ItemRowData;
  onPress?: () => void;
  onAction?: () => void;
};

export default function ItemRow({ item, onPress, onAction }: ItemRowProps) {
  const img =
    (Array.isArray(item.images) && item.images[0]) ||
    (Array.isArray(item.image) ? item.image[0] : item.image) ||
    undefined;

  return (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image
        source={
          img
            ? { uri: img }
            : require("@/assets/images/armchair1.png")
        }
        style={styles.thumb}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.price}>€ {String(item.price)}</Text>
      </View>

      <TouchableOpacity onPress={onAction}>
        <Image
          source={require("@/assets/images/close.png")}
          style={styles.actionIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
    backgroundColor: "#fff",
  },
  thumb: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    gap: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black,
  },
  price: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "700",
    color: Colors.black,
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
});