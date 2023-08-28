import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { store } from '../../redux/store';
import axios from 'axios';
import { AUTHENTICATED_AXIOS_HEADER } from '../../constants/APIs';
import { err } from 'react-native-svg/lib/typescript/xml';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const { token, info } = store.getState().user;

export default function HomeScreen() {
  const summary = useSelector((state: RootState) => state.items.summary); 

  return (
      <SafeAreaProvider>
        <Header/>
        <View>
          <Text style={styles.hometitle}>Welcome Back!</Text>
          <Text style={styles.itemcounttitle}>{"Number of Items in Fridge: " + summary?.totalItems}</Text>
          <Text style={styles.itemcounttitle}>{"Number of items expiring in 1 day: " +  summary?.totalExpiringInOneDay}</Text>
          <Text style={styles.itemcounttitle}>{"Number of expired items: " + summary?.totalExpiredItems}</Text>
        </View>
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