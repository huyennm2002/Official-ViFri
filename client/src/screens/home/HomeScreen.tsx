import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { store } from '../../redux/store';
import axios from 'axios';
import { AUTHENTICATED_AXIOS_HEADER } from '../../constants/APIs';
import { err } from 'react-native-svg/lib/typescript/xml';

const { token, info } = store.getState().user;

export default function HomeScreen() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (token != undefined) {
      axios({
        url: `http://localhost:3005/items:getSummary`,
        headers: AUTHENTICATED_AXIOS_HEADER(token),
        method: `post`
      })
      .then(res => {
        console.log(res.data);
        setSummary(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    }
    
  }, [])

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