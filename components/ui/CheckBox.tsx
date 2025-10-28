import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ViewStyle, StyleProp } from "react-native";
import Colors from "@/constants/Colors";

export type CheckboxProps = {
  checked: boolean;
  onCheck: (value: boolean) => void;
  title?: string;
  style?: StyleProp<ViewStyle>
};

function Checkbox({ checked, onCheck, title, style }: CheckboxProps) {
  const handlePress = () => {
    onCheck(!checked);
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.6}
    >
      <View style={styles.checkboxBase}>
        {checked && (
          <Image
            source={require("@/assets/images/check.png")}
            style={styles.checkIcon}
            resizeMode="contain"
          />
        )}
      </View>
      <Text style={styles.title}>
        I agree to the <Text style={styles.boldText}>Terms</Text> and{" "}
        <Text style={styles.boldText}>Privacy</Text>
      </Text>
    </TouchableOpacity>
  );
}

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: Colors.extraLightGrey,
  },
  checkIcon: {
    width: 16,
    height: 16,
  },
  title: {
    fontSize: 14,
    color: Colors.lightGrey,
  },
  boldText: {
    fontWeight: "bold",
    color: Colors.blue,
  },
});