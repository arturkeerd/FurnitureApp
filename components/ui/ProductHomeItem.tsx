import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions, ImageSourcePropType } from "react-native";
import Colors from "@/constants/Colors";

const HORIZONTAL_PADDING = 10;
const GAP_BETWEEN_COLUMNS = 10;

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
      <View style={styles.imageWrap}>
      <Image source={source} style={styles.image} resizeMode="cover" />
      </View>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text style={styles.price} numberOfLines={1}>€ {price}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(ProductHomeItem);

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
  },
  imageWrap: {
    width: "100%",
    alignItems: "center",      // center the image inside the card
  },
  image: {
    height: 200,
    width: "92%",
    maxHeight: 200,
    borderRadius: 8,
    marginBottom: 8,
    alignSelf: "center",
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