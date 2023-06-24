import { Text, StyleSheet, Image, Button } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import DismissKeyBoardView from '../../components/DismissKeyboardView';
import { Alert } from 'react-native';
import { USER_SIGN_IN } from '../../redux/action';
import { SignInData } from '../../../types';

export default function SignInScreen({navigation}) {
  const dispatch = useDispatch();
  const [data, setData] = useState<SignInData>({
    email: '',
    password: ''
  })
  const handleChange = (key : string, value: string) => {
    setData(currentData => ({
      ...currentData,
      [key]: value
    }));
  }
  const handleSubmit = () => {
    if ((isEmpty(data.email) || isEmpty(data.password))) {
      Alert.alert('Please enter both email and password');
    } else {
      dispatch(USER_SIGN_IN(data))
    }
  }

  return (
    <DismissKeyBoardView style={styles.container}>
      <Text style={styles.brandname}>ViFri</Text>
      <TextInput style={styles.textinput}
        placeholder="Email"
        onChangeText={(e) => handleChange('email', e)}
      />
      <TextInput style={styles.textinput}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(e) => handleChange('password', e)}
      />
      <Button
        title="Sign In"
        onPress={handleSubmit}
      />
      <Button
        title="Create Account?"
        onPress={() => navigation.navigate("SignUp")}
      />

      <Image style={styles.logo}
        source={{
          uri: 'https://www.galanz.com/us/wp-content/uploads/2020/10/GLR31TBEER2_45%C2%B0.png',
        }}
      />
    </DismissKeyBoardView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center"
  },
  textinput: {
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 23,
    margin: 15,
    width: 290,
    fontSize: 20,
    height: 60
  },
  brandname: {
    fontWeight: 'bold',
    fontSize: 75,
    margin: 20,
    fontFamily: 'Baskerville',
    fontStyle: 'italic'
  },
  logo: {
    width: 300,
    height: 300,
    margin: 20
  },
});