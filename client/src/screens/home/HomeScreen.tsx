import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header';

export default function HomeScreen() {
  return (
      <SafeAreaProvider>
        <Header/>
        <Text style={styles.hometitle}>Welcome Back!</Text>
        <Text style={styles.itemcounttitle}>Number of Items in Fridge: ???</Text>
        <Text style={styles.itemcounttitle}>Number of items about to expire: ???</Text>
      </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  hometitle: {
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 50,
    textAlign: 'center',
  },
  itemcounttitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#fff',
    marginRight: 25,
    marginLeft: 25,
    marginTop: 15,
  },
  expirecounttitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#fff',
    marginRight: 25,
    marginLeft: 25,
    marginTop: 15
  },
})