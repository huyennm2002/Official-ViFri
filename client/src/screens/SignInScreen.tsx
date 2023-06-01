import { View, Text, StyleSheet, Image, Button } from 'react-native'
import React from 'react'
import DismissKeyBoardView from '../components/DismissKeyboardView';
import { TextInput } from 'react-native-gesture-handler';

export default function SignInScreen({ navigation }) {

  const handleSubmit = async () => {
    navigation.navigate("Main")
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
    backgroundColor: '#f2f2f2',
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