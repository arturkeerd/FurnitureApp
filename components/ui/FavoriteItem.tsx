import Colors from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type FavItem = {
  _id: string;
  title: string;
  price: string | number;
  image?: string | string[];
  images?: string[];
};

type Props = {
  item: FavItem;
  onPress?: (item: FavItem) => void;         // open ProductDetail
  onRemove?: (itemId: string) => void;       // remove from favorites
};

const FavoriteItem: React.FC<Props> = ({ item, onPress, onRemove }) => {
  const img =
    (Array.isArray(item.images) && item.images[0]) ||
    (Array.isArray(item.image) ? item.image[0] : item.image) ||
    undefined;

  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={() => onPress?.(item)}>
      <Image
        source={img ? { uri: img } : require("../../assets/images/armchair1.png")}
        style={styles.thumb}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${String(item.price)}</Text>
      </View>

      <TouchableOpacity
        onPress={() => onRemove?.(item._id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={styles.removeButton}
      >
        <Text style={styles.removeText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 14,
    backgroundColor: "#fff",
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#eee",
  },
  info: { 
    flex: 1 
  },
  title: { 
    fontSize: 15, 
    fontWeight: "600", 
    color: Colors.black
  },
  price: { 
    marginTop: 4, 
    fontSize: 14, 
    fontWeight: "500", 
    color: Colors.black
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  removeText: { 
    fontSize: 16, 
    fontWeight: "700", 
    color: "#666" 
  },
});

export default FavoriteItem;