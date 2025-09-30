import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export default function FormBox({ children, style }: Props) {
  return <View style={[styles.formBox, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  formBox: {
    width: '100%',
    height: '15%',
    padding: 5,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#c8c4c4ff',
    justifyContent: 'center',
    // add light border or elevation/shadow later
  },
});