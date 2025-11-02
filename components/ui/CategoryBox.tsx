import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

type CategoryBoxProps = {
  title: string;
  imageUrl: string;
  isSelected?: boolean;
  onPress: () => void;
};

const CategoryBox = ({
  title,
  imageUrl,
  isSelected = false,
  onPress,
}: CategoryBoxProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <View style={[styles.container, isSelected && styles.selectedContainer]}>
        <Image source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl} style={styles.image} />
      </View>
      <Text
        style={[styles.title, isSelected && styles.selectedTitle]}
        numberOfLines={1}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(CategoryBox);

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 12,
    alignItems: "center",
  },
  container: {
    backgroundColor: Colors.extraLightGrey,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  selectedContainer: {
    backgroundColor: Colors.lightGrey,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 14,
    color: Colors.lightGrey,
    marginTop: 6,
    textAlign: "center",
    width: 70,
  },
  selectedTitle: {
    color: Colors.blue,
    fontWeight: "600",
  },
});