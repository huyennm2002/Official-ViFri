import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React from 'react'
import DismissKeyboardView from '../components/DismissKeyboardView'
import Header from '../components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaProvider>
      <Header/>
      <DismissKeyboardView style={styles.container}>
      <Text style={styles.brandname}>Update info</Text>
      <TextInput style={styles.textinput}
        placeholder="Username"
      />
      <TextInput style={styles.textinput}
        placeholder="Email"
      />
      <Button
        title="Submit"
      />
      <Button
        title="Logout"
      />
    </DismissKeyboardView>
    </SafeAreaProvider>
    
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
    fontSize: 36,
    margin: 10
  },
  dropdown: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 300
  },
  dropdownHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10
  }
});