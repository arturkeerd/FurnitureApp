import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import Colors from "@/constants/Colors";

export type InputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  isPasswordVisible?: boolean;
  onEyePress?: () => void;
  style?: StyleProp<TextStyle>;          // TextInput style
  containerStyle?: StyleProp<ViewStyle>; // outer box style
  multiline?: boolean;
};

function Input({
  label,
  placeholder,
  value,
  onChangeText,
  isPassword,
  isPasswordVisible,
  onEyePress,
  style,
  containerStyle,
  multiline,
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, containerStyle]}>
        <TextInput
          style={[styles.input, style]}
          placeholder={placeholder}
          placeholderTextColor={Colors.lightGrey}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !isPasswordVisible}
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "center"}
        />
        {isPassword && (
          <Pressable onPress={onEyePress} style={styles.eyeButton}>
            <Image
              source={
                isPasswordVisible
                  ? require("@/assets/images/eye.png")
                  : require("@/assets/images/eye-closed.png")
              }
              style={styles.eyeIcon}
              resizeMode="contain"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    width: "100%",
    alignSelf: "center",
  },
  label: {
    fontSize: 14,
    color: Colors.blue,
    marginBottom: 8,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
    height: 60,          // default; can be overridden via containerStyle
    width: "100%",
    maxWidth: 400,
    minWidth: 200,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
    paddingVertical: 16,
  },
  eyeButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
});