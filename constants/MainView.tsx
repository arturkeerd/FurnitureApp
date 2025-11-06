import React, {ReactNode} from 'react';
import { ViewStyle, StyleProp, Text, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MainViewProps = {
  header?: ReactNode;
  footer?: ReactNode;
  scroll?: boolean;
  backgroundColor?: string;
  headerImage?: React.ReactNode;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

const MainView: React.FC<MainViewProps> = ({
  header,
  footer,
  scroll = true,
  style,
  contentStyle,
  children,
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {header}
      <View style={{ flex: 1 }}>
        {scroll ? (
        <ScrollView contentContainerStyle={[styles.content, contentStyle]}>
          {children}
        </ScrollView>
        ) : (
        <View style={[styles.content, { flex: 1 }, contentStyle]}>
          {children}
        </View>
        )}
      </View>
      {footer ?? null}
    </SafeAreaView>
  );
};

const HEADER_HEIGHT = 220;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#ffffffff',
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
    paddingLeft: 24,
    paddingRight: 24,
    gap: 6,
    flexGrow: 1,
  },
});

export default MainView;