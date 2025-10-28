import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import AuthHeader from '@/components/ui/AuthHeader';
import MainView from '@/constants/MainView';
import MainButton from '@/components/ui/MainButton';
import Colors from '@/constants/Colors';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/CheckBox';

export default function signUp() {

  const router = useRouter();
  const goBack = () => {
    router.push ("/");
  }
    const signUp = () => {
    router.push ("/auth/SignUp");
  }
    const google = () => {
    router.push ("/");
  }
    const signIn = () => {
    router.push ("/auth/SignIn");
  }
  const [name, setName] = useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [checked, setChecked] = useState(false);

    return (
    <MainView>
      <View style={styles.headerContainer}>
        <AuthHeader title="Sign Up" onPress={goBack} />
      </View>
      <View style={styles.container}>
          <Pressable>
            <Input
              label="Name"
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
            />
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
            <Checkbox style={{ maxWidth: 400, alignSelf: "center" }}
              checked={checked}
              onCheck={setChecked}
              title="I agree with Terms & Privacy"
            />

              <Pressable onPress={signUp}>
                <MainButton style={{ marginTop: 40, marginBottom: 20, }}>Sign Up</MainButton>
              </Pressable>
                <View style={[styles.dividerContainer]}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.subText}>Or sign in with</Text>
                  <View style={styles.dividerLine} />
                </View>
              <Pressable onPress={google}>
                <Image style={styles.Gmail} source={require('@/assets/images/gmail.png')}/>
              </Pressable>
            <Text style={styles.signIn} onPress={signIn}>Already have an account?  <Text style={{ fontWeight: '600' }}>Sign In</Text></Text>
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
  checkbox: {
    width: '80%',
    maxWidth: 200,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,
    gap: 10,
    top: 20,
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
  signIn: {
    top: 40,
    textAlign: 'center',
    color: Colors.blue,
  },
});