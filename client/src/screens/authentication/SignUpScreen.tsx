import { View, Text, StyleSheet, TextInput, Image, Button } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { isEmpty } from 'lodash';
import DismissKeyboardView from '../../components/DismissKeyboardView'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SIGNIN_SCREEN } from '../../navigation/screenNames';
import { Alert } from 'react-native';
import { SIGNUP_API } from '../../apis/userAPIs';
import ImageUploader from '../../components/ImageUploader';

type SignUpData = {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  dob: Date
}


export default function SignUpScreen({navigation}) {
  const [data, setData] = useState<SignUpData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    dob: null
  })
  const checkEmpty = () => {
    return isEmpty(data.first_name) || isEmpty(data.last_name) || isEmpty(data.email) || isEmpty(data.password);
  }
  const handleChange = (key : string, value: any) => {
    setData(currentData => ({
      ...currentData,
      [key]: value
    }));
  }
  const handleSubmit = () => {
    if (checkEmpty()) {
      Alert.alert('All fields are required');
      return;
    }
    axios({
      url: SIGNUP_API,
      method: "POST",
      data,
      headers: { "Access-Control-Allow-Origin": "*" }
    }).then(() => {
      setData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        dob: null
      });
      Alert.alert('Sucessfully signed up!\nPlease log in to continue');
      navigation.navigate("SignIn");
    }).catch((err) => {
      Alert.alert(err.message);
    })
  }

  return (
    <DismissKeyboardView style={styles.container}>
      <Text style={styles.brandname}>Welcome to ViFri!</Text>
      <TextInput style={styles.textinput}
        placeholder="First Name"
        onChangeText={(e) => handleChange('first_name', e)}
      />
      <TextInput style={styles.textinput}
        placeholder="Last Name"
        onChangeText={(e) => handleChange('last_name', e)}
      />
      <TextInput style={styles.textinput}
        placeholder="Email"
        onChangeText={(e) => handleChange('email', e)}
      />
      <TextInput style={styles.textinput}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(e) => handleChange('password', e)}
      />
      <DateTimePicker
        value={new Date()}
        onChange={(e) => handleChange('dob', e)}
      />
      <Button
        title='Create an account'
        onPress={handleSubmit}
      />
      <ImageUploader/>
      <View>
        <Text>Already have an Account?</Text>
        <Button
          title='Sign In'
          onPress={() => navigation.navigate(SIGNIN_SCREEN)}
        />
      </View>
    </DismissKeyboardView>
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
    margin: 10,
    width: 290,
    fontSize: 20,
    height: 60
  },
  brandname: {
    fontWeight: 'bold',
    fontSize: 40,
    margin: 10
  },
  logo: {
    width: 200,
    height: 200,
    margin: 20
  },
  newusertext: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
