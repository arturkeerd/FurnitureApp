import Input from '@/components/ui/Input';
import MainButton from '@/components/ui/MainButton';
import Colors from '@/constants/Colors';
import MainView from '@/constants/MainView';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AuthHeader from '@/components/ui/AuthHeader';

export default function signIn() {

  const router = useRouter();
  const goBack = () => {
    router.push ("/");
  }
    const signIn = () => {
      console.log("Email:", email);
      console.log("Password:", password);
    router.push ("/home/Home");
  }
    const google = () => {
    router.push ("/");
  }
    const signUp = () => {
    router.push ("/auth/SignUp");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <MainView>
      <View style={styles.headerContainer}>
        <AuthHeader title="Sign In" onPress={goBack} />
      </View>
      <View style={styles.container}>
          <Pressable>
            <Input
              label="E-mail"
              placeholder="example@gmail.com"
              value={email}
              onChangeText={setEmail}
            />
            <Input
                  label="Password"
                  placeholder="**********"
                  value={password}
                  onChangeText={setPassword}
                  isPassword={true}
                  isPasswordVisible={isPasswordVisible}
                  onEyePress={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              <Pressable onPress={signIn}>
                <MainButton style={{ marginTop: 40, marginBottom: 20, }}>Sign In</MainButton>
              </Pressable>
                <View style={[styles.dividerContainer]}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.subText}>Or sign in with</Text>
                  <View style={styles.dividerLine} />
                </View>
              <Pressable onPress={google}>
                <Image style={styles.Gmail} source={require('@/assets/images/gmail.png')}/>
              </Pressable>
            <Text style={styles.signUp} onPress={signUp}>Don't have an account?  <Text style={{ fontWeight: '600' }}>Sign Up</Text></Text>
          </Pressable>
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  container:{
    width: '90%',
    alignSelf: 'center',
  },
  formLabel: {
    marginTop: 20,
    marginBottom:5,
  },
  subText: {
    top: 20,
    alignSelf: 'center',
    color: Colors.blue,
    height: 60,
    fontWeight: '600',
  },
  dividerContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    gap: 10,
  },
  dividerLine: {
    marginTop: 30,
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGrey,
  },
  formElementCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
    Gmail: {
    height: 60,
    width: 142,
    alignSelf: 'center'
  },
  signUp: {
    top: 40,
    textAlign: 'center',
    color: Colors.blue,
  },
});