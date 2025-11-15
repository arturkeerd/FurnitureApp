import Colors from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type FavItem = {
  _id: string;                   // favorite document id (for DELETE)
  productId: string;             // actual product _id used by ProductDetail
  title: string;
  price: string | number;
  image?: string | string[];
  images?: string[];
};

type Props = {
  item: FavItem;
  onPress?: () => void;               // open ProductDetail
  onRemove?: (itemId: string) => void;
};

const FavoriteItem: React.FC<Props> = ({ item, onPress, onRemove }) => {
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
        source={img ? { uri: img } : require("../../assets/images/armchair1.png")}
        style={styles.thumb}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>$ {String(item.price)}</Text>
      </View>

      <TouchableOpacity
        onPress={() => onRemove?.(item._id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Image
          source={require("../../assets/images/close.png")}
          style={styles.close}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

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
    top: -20,
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
  close: {
    top: -20,
  },
});

export default FavoriteItem;