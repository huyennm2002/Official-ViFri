import { View, Text, StyleSheet, TextInput, Image, Button } from 'react-native'
import React from 'react'
import DismissKeyboardView from '../components/DismissKeyboardView'

export default function SignUpScreen({navigation}) {
  const handleSubmit = () => {
    navigation.navigate('Main');
  }
  
  return (
    <DismissKeyboardView style={styles.container}>
      <Text style={styles.brandname}>Welcome to ViFri!</Text>
      <Text style={styles.newusertext}>Enter a username and password to get started</Text>
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
      <Button
        title='Create New Account'
        onPress={handleSubmit}
      />
      <Image style={styles.logo}
                source={{
                    uri: 'https://www.galanz.com/us/wp-content/uploads/2020/10/GLR31TBEER2_45%C2%B0.png',
                }}
            />
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
    backgroundColor: '#f2f2f2',
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
