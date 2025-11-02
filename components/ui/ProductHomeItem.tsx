import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions, ImageSourcePropType } from "react-native";
import Colors from "@/constants/Colors";

const HORIZONTAL_PADDING = 30;
const GAP_BETWEEN_COLUMNS = 30;

type ProductHomeItemProps = {
  title: string;
  price: string;
  // allow both remote URLs and local require(...) assets
  imageUrl: string | ImageSourcePropType;
  onPress: () => void;
};

const ProductHomeItem = ({ title, price, imageUrl, onPress }: ProductHomeItemProps) => {
  const { width } = useWindowDimensions();
  const itemWidth = (width - HORIZONTAL_PADDING * 2 - GAP_BETWEEN_COLUMNS) / 2;

  const source =
    typeof imageUrl === "string"
      ? { uri: imageUrl } // remote
      : imageUrl;         // local require(...)

  return (
    <TouchableOpacity style={[styles.container, { width: itemWidth }]} onPress={onPress}>
      <Image source={source} style={[styles.image, { height: itemWidth }]} resizeMode="cover" />
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text style={styles.price} numberOfLines={1}>{price}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(ProductHomeItem);

const styles = StyleSheet.create({
  container: {
    maxWidth: 200,
    maxHeight: 250,
    minHeight: 150,
    borderRadius: 12,
    marginRight: 20,
    marginBottom: 16,
    alignItems: "center",
  },
  image: {
    width: "100%",
    maxHeight: 200,
    borderRadius: 8,
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