import { Image } from 'expo-image';
import { StyleSheet, View, Pressable } from 'react-native';
import MainView from '@/constants/MainView';
import MainText from '@/constants/MainText';
import MainButton from '@/components/ui/MainButton'
import { useRouter} from 'expo-router';


export default function HomeScreen() {
  const router = useRouter();
  const goBack = () => {
    router.push ("/");
  }
    const signIn = () => {
    router.push ("/auth/SignIn");
  }
    const google = () => {
    router.push ("/");
  }
    const signUp = () => {
    router.push ("/auth/SignUp");
  }

  return (
    <MainView showHeader={false}>
        <Image
          source={require('@/assets/images/Furniture-splash.png')}
          style={styles.splash}
        />
        <View style={styles.nonImage}>
          <View style={styles.text}>
            <MainText type="title" style={styles.centerText}>You'll Find</MainText>
            <MainText type="orange" style={[styles.centerText, styles.underLine]}>All you need</MainText>
            <MainText type="title" style={styles.centerText}>Here!</MainText>
          </View>
            <Pressable onPress={signUp}>
              <MainButton type="mainbutton">Sign Up</MainButton>
            </Pressable>
            <Pressable onPress={signIn}>
              <MainButton type="mainbutton" style={{ 
                font: '#4F63AC', 
                backgroundColor: '#fff' }}
            textStyle={{
              color: '#4F63AC',
              fontWeight: 'bold',
              fontSize: 16,
            }}
              >Sign In</MainButton>
            </Pressable>
        </View>    
    </MainView>
  );
}

const styles = StyleSheet.create({
  splash: {
    height: 178,
    width: 290,
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
    margin: 'auto',
  },
  nonImage: {
    width: 300,
    top: 140,
    marginTop: 190,
    margin: 'auto',
    gap: 20,
  },
  text: {
    gap: 10,
    padding: 50,
  },
  centerText: {
    textAlign: 'center',
  },
  underLine: {
    textDecorationLine: 'underline',
  },

});
