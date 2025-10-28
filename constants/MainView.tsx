import React, {ReactNode} from 'react';
import { ViewStyle, StyleProp, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MainViewProps = {
  header?: ReactNode;
  backgroundColor?: string;
  headerImage?: React.ReactNode;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

const MainView: React.FC<MainViewProps> = ({
  header,
  style,
  contentStyle,
  children,
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {header}
      <ScrollView contentContainerStyle={[styles.content, contentStyle]}>
        {children}
      </ScrollView>
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
    flexGrow: 1,
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