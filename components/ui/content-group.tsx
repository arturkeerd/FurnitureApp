import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  offsetTop?: number;
  style?: ViewStyle | ViewStyle[];
};

export default function contentGroup({ children, offsetTop = 120, style }: Props) {
  return (
    <View style={[styles.group, { marginTop: offsetTop }, style]}>{children}</View>
  );
}