import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export default function MainButton({ children, style }: Props) {
  return <View style={[styles.signIn, styles.signInText, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  signIn: {
    height: 60,
    width: '100%',
    backgroundColor: '#4F63AC',
    color: 'white',  
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 8,
  },
  signInText: {
    textAlign: 'center',
    color: '#ffffffff',
    fontWeight: '600',
  },
});