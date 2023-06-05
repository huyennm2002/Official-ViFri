import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.hometitle}>Welcome Back!</Text>
        <Text style={styles.itemcounttitle}>Number of Items in Fridge: ???</Text>
        <Text style={styles.itemcounttitle}>Number of items about to expire: ???</Text>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },
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