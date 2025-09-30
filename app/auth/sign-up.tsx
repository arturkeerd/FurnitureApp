import { Image } from 'expo-image'
import { StyleSheet, View, Pressable, Text, TextInput } from 'react-native';
import React, { Component } from 'react'
import MainView from '@/constants/main-view';
import MainText from '@/constants/main-text';
import { useRouter} from 'expo-router';
import FormBox from '@/components/ui/form-box';
import MainButton from '@/components/ui/mainbutton'
import Colors from '@/constants/colors'

export default function signUp() {

  const router = useRouter();
  const goBack = () => {
    router.push ("/");
  }
    const signUp = () => {
    router.push ("/auth/sign-up");
  }
    const google = () => {
    router.push ("/");
  }
    const signIn = () => {
    router.push ("/auth/sign-in");
  }

  return (
    <MainView showHeader={false}>
      <View style={styles.container}>
          <Pressable style={styles.header} onPress={goBack}>
            <Image style={styles.arrow} source={require('@/assets/images/arrow-left.png')}/>
            <MainText type="link" style={styles.heading}>Sign Up</MainText>
          </Pressable>
          <Pressable>
            <MainText type="formlabel" style={styles.formLabel}>Name</MainText>
            <FormBox>
              <TextInput style={styles.textInput} placeholder='Name' placeholderTextColor={Colors.lightGrey}></TextInput>
            </FormBox>
            <MainText type="formlabel" style={styles.formLabel}>E-mail</MainText>
            <FormBox>
              <TextInput style={styles.textInput} placeholder='example@gmail.com' placeholderTextColor={Colors.lightGrey}></TextInput>
            </FormBox>
            <MainText type="formlabel" style={styles.formLabel}>Password</MainText>
            <FormBox>
                <TextInput style={styles.textInput} placeholder='**********' placeholderTextColor={Colors.lightGrey}></TextInput>
                <Image style={styles.showPw} source={require('@/assets/images/showpw.png')}/>
            </FormBox>
            <View style={styles.agree}>
                <Image style={styles.check} source={require('@/assets/images/check.png')}/>
                <Text style={styles.terms}>I agree with  <Text style={{ fontWeight: '700' }}>Terms</Text> &  <Text style={{ fontWeight: '700' }}>Privacy</Text></Text>
            </View>
            <Pressable onPress={signUp}>
                <MainButton type="mainbutton" style={{ marginTop: 40, marginBottom: 20, }}>Sign Up</MainButton>
            </Pressable>
            <View style={[styles.formElement, styles.formElementLine]}>
              <View style={[styles.line]}/>
                <Text style={styles.subText}>Or sign up with</Text>
              <View style={[styles.line]}/>
            </View>
              <Pressable type="google" onPress={google}>
                <Image style={styles.Gmail} source={require('@/assets/images/gmail.png')}/>
              </Pressable>
            <Text style={styles.signUp} onPress={signUp}>Already have an account? <Text style={{ fontWeight: '600' }}>Sign In</Text></Text>
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
  check: {
    height: 22,
    width: 22,
  },
  agree: {
    flex:1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    top: 20,
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
  terms: {
    color: Colors.blue,
  }
});