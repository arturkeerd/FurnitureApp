import React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export default function MainButton({ children, style, textStyle }: any) {
  return (
  <View style={[styles.signInButton, style]}>
    <Text style={[styles.signInText, textStyle]}>{children}</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  signInButton: {
    height: 60,
    width: '100%',
    maxWidth: 400,
    minWidth: 200,
    backgroundColor: '#4F63AC',
    color: 'white',  
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  signInText: {
    textAlign: 'center',
    color: '#ffffffff',
    fontWeight: '600',
  },
});