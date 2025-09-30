// MainText.tsx
import React from 'react';
import { Text, StyleSheet, Platform, TextProps, TextStyle } from 'react-native';

type MainTextKind = 'default' | 'title' | 'orange' | 'subtitle' | 'mainbutton' | 'formlabel' ;

type MainTextProps = TextProps & {
  children: React.ReactNode;
  type?: MainTextKind;        // <-- use this in your JSX: <MainText type="title">...</MainText>
  style?: TextStyle | TextStyle[];
};

const MainText: React.FC<MainTextProps> = ({ children, type = 'default', style, ...rest }) => {
  return (
    <Text style={[styles.base, styles[type], style]} {...rest}>
      {children}
    </Text>
  );
};

export const Colors = {
  text: '#0c7dbf',   // simpler 6-digit hex
  icon: '#687076',
};

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    serif: 'Times New Roman',
    rounded: 'System',
    mono: 'Menlo',
  },
  android: {
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
  default: {
    sans: 'system-ui',
    serif: "Georgia, 'Times New Roman', serif",
    rounded: 'system-ui',
    mono: "SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
  },
});

const styles = StyleSheet.create({
  base: {
    // Put shared text defaults here (fontFamily, color, etc.)
    color: '#303030',
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: '700',
  },
  orange: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: '700',
    color: '#FCA34D',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  mainbutton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffffff',
  },
  formlabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4F63AC',
  },
});

export default MainText;
