import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import MainText from '@/constants/MainText';
import Colors from '@/constants/Colors';

const AuthHeader = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <View style={styles.header}>
      <Pressable onPress={onPress}>
        <Image style={styles.arrow} source={require('@/assets/images/arrow-left.png')} />
      </Pressable>
      <MainText type="link" style={styles.heading}>{title}</MainText>
    </View>
  );
}

export default AuthHeader;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 50,
  },
  arrow: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    color: Colors.blue,
  },
});