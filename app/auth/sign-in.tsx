import { Image } from 'expo-image'
import { StyleSheet, View, Pressable, Text, TextInput } from 'react-native';
import React, { Component } from 'react'
import MainView from '@/constants/main-view';
import MainText from '@/constants/main-text';
import { useRouter} from 'expo-router';
import FormBox from '@/components/ui/form-box';
import MainButton from '@/components/ui/mainbutton'
import Colors from '@/constants/colors'

export default function signIn() {

  const router = useRouter();
  const goBack = () => {
    router.push ("/");
  }
    const signIn = () => {
    router.push ("/auth/sign-in");
  }
    const google = () => {
    router.push ("/");
  }
    const signUp = () => {
    router.push ("/auth/sign-up");
  }

  return (
    <MainView showHeader={false}>
      <View style={styles.container}>
          <Pressable style={styles.header} onPress={goBack}>
            <Image style={styles.arrow} source={require('@/assets/images/arrow-left.png')}/>
            <MainText type="link" style={styles.heading}>Sign In</MainText>
          </Pressable>
          <Pressable>
            <MainText type="formlabel" style={styles.formLabel}>E-mail</MainText>
            <FormBox>
              <TextInput style={styles.textInput} placeholder='example@gmail.com' placeholderTextColor={Colors.lightGrey}></TextInput>
            </FormBox>
            <MainText type="formlabel" style={styles.formLabel}>Password</MainText>
            <FormBox>
                <TextInput style={styles.textInput} placeholder='**********' placeholderTextColor={Colors.lightGrey}></TextInput>
                <Image style={styles.showPw} source={require('@/assets/images/showpw.png')}/>
            </FormBox>
              <Pressable onPress={signIn}>
                <MainButton type="mainbutton" style={{ marginTop: 40, marginBottom: 20, }}>Sign In</MainButton>
              </Pressable>
            <View style={[styles.formElement, styles.formElementLine]}>
              <View style={[styles.line]}/>
                <Text style={styles.subText}>Or sign in with</Text>
              <View style={[styles.line]}/>
            </View>
              <Pressable type="google" onPress={google}>
                <Image style={styles.Gmail} source={require('@/assets/images/gmail.png')}/>
              </Pressable>
            <Text style={styles.signUp} onPress={signUp}>Don't have an account?  <Text style={{ fontWeight: '600' }}>Sign Up</Text></Text>
          </Pressable>
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({
  container:{
    width: '90%',
    alignSelf: 'center',
  },
  header:{
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 12,
    marginBottom: 40,
  },
  arrow:{
    height: 18,
    width: 18,
  },
  heading: {
    color: '#4F63AC',
    fontWeight: '600',
    fontSize: 26,
    textAlign: 'left',
  },
  formLabel: {
    marginTop: 20,
    marginBottom:5,
  },
  textInput: {
    paddingHorizontal: 17
  },
  showPw: {
    position: 'absolute',
    height: 20,
    width: 24,
    right: 20,
  },
  Gmail: {
    position: 'absolute',
    height: 60,
    width: 142,
    alignSelf: 'center'
  },
  subText: {
    top: 20,
    alignSelf: 'center',
    color: Colors.blue,
    height: 60,
    fontWeight: '600',
  },
  formElementLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  formElementCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGrey,
  },
  signUp: {
    top: 120,
    textAlign: 'center',
    color: Colors.blue,
  },
});