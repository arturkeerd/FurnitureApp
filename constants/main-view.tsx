import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

type MainViewProps = {
  showHeader?: boolean;
  backgroundColor?: string;
  headerImage?: React.ReactNode;
  children?: React.ReactNode;
  style?: ViewStyle;
};

const MainView = ({ showHeader = true, children, ...props }) => {
  return (
    <SafeAreaView style={styles.container}>
      {showHeader ? (
        <View style={styles.header}>{/* header content */}</View>
      ) : null}
      <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
    </SafeAreaView>
  );
};

const HEADER_HEIGHT = 220;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: HEADER_HEIGHT,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  headerImageWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  content: {
    padding: 24,
    gap: 16,
  },
});

const Colors = {
    background: '#FFFFFF',
    blue: '#4F63AC',
    orange: '#fca34d',
    darkBlue: '#3f4a59',
    black: '#303030',
    white: '#FFFFFF',
    grey: '#606060',
    lightGrey: "#C5C5C5",
    inactiveButton: "#F5F5F5"
};
export default MainView;