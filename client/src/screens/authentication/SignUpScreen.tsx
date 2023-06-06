import { View, Text, StyleSheet, TextInput, Image, Button } from 'react-native'
import React, { useState } from 'react'
import DismissKeyboardView from '../../components/DismissKeyboardView'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SIGNIN_SCREEN } from '../../navigation/screenNames';

export default function SignUpScreen({navigation}) {
  const [photo, setPhoto] = React.useState(null);

  const handleSubmit = () => {
    navigation.navigate('Main');
  }

  return (
    <DismissKeyboardView style={styles.container}>
      <Text style={styles.brandname}>Welcome to ViFri!</Text>
      <TextInput style={styles.textinput}
        placeholder="First Name"
      />
      <TextInput style={styles.textinput}
        placeholder="Last Name"
      />
      <TextInput style={styles.textinput}
        placeholder="Email"
      />
      <TextInput style={styles.textinput}
        placeholder="Password"
        secureTextEntry={true}
      />
      <DateTimePicker value={new Date()} />
      <Button
          title='Create an account'
          onPress={() => navigation.navigate(SIGNIN_SCREEN)}
        />
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
