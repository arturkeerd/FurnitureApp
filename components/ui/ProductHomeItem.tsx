import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const { width } = Dimensions.get("window");

// 10px padding left + 10px padding right + 10px gap between columns = 30px total
const HORIZONTAL_PADDING = 10;
const GAP_BETWEEN_COLUMNS = 10;
const ITEM_WIDTH = (width - HORIZONTAL_PADDING * 2 - GAP_BETWEEN_COLUMNS) / 2;

type ProductHomeItemProps = {
  title: string;
  price: string;
  imageUrl: string;
  onPress: () => void;
};

const ProductHomeItem = ({
  title,
  price,
  imageUrl,
  onPress,
}: ProductHomeItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.price} numberOfLines={1}>
        {price}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(ProductHomeItem);

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    width: ITEM_WIDTH,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: ITEM_WIDTH,
    borderRadius: 8,
    resizeMode: "cover",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: Colors.grey,
    marginBottom: 4,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  price: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: "700",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
}); 