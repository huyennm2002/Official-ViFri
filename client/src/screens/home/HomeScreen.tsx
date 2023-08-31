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
import {LinearGradient} from 'expo-linear-gradient';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { token, info } = store.getState().user;

export default function HomeScreen() {
  const summary = useSelector((state: RootState) => state.items.summary); 

  return (
      <SafeAreaProvider style={{backgroundColor: 'white'}}>
        <Header closeModal={() => false}/>
        <View>
          <LinearGradient
          colors={['#DF4630', '#C7166F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.bannerContainer}
          >
            <Text style={styles.bannerText}>&#x2600; {" Good morning, " + info.first_name + "!"}</Text>
          </LinearGradient>
          <View style={{marginLeft: 20, marginBottom: 15}}>
            <Text style={styles.fridgeContentText}>Fridge Stats &#128523; </Text>
          </View>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryChildContainer}>
              <Text style={styles.summaryTitle}>Total Items:</Text>
              <Text style={styles.summaryStat}>{String(summary?.totalItems)}</Text>
            </View>
            <View style={styles.summaryChildContainer}>
              <Text style={styles.summaryTitle}>Expired Items:</Text>
              <Text style={styles.summaryStat}>{String(summary?.totalExpiredItems)}</Text>
            </View>
            <View style={styles.summaryChildContainer}>
              <Text style={styles.summaryTitle}>Expiring Items Tomorrow:</Text>
              <Text style={styles.summaryStat}>{String(summary?.totalExpiringInOneDay)}</Text>
            </View>
            <View style={styles.summaryChildContainer}>
              <Text style={styles.summaryTitle}>Days without food waste:</Text>
              <Text style={styles.summaryStat}>{String(summary?.totalExpiringInOneDay)}</Text>
            </View>
          </View>

          {/* <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Items in Fridge</Text>
              <Text style={styles.summaryNumber}>{String(summary?.totalItems)}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Expired items</Text>
              <Text style={styles.summaryNumber}>{String(summary?.totalExpiredItems)}</Text>
            </View>
          </View>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Expring tomrrow</Text>
              <Text style={styles.summaryNumber}>{String(summary?.totalExpiringInOneDay)}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Days with no waste</Text>
              <Text style={styles.summaryNumber}>{String(summary?.totalExpiringInOneDay)}</Text>
            </View>
          </View> */}
        </View>
      </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  hometitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 25,
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
  // summaryContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 20,
  //   marginTop: 20.
  // },
  // summaryCard: {
  //   width: 165,
  //   height: 165,
  //   borderRadius: 10, // Adjust the border radius as desired
  //   backgroundColor: 'white',
  //   elevation: 5, // Add elevation for shadow effect on Android
  //   shadowColor: '#000', // Shadow color for iOS
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 4,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // summaryTitle: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   marginBottom: 8,
  // },
  // summaryNumber: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  // }
  
  // new summary container
  summaryContainer: {
    backgroundColor: '#FAE6D1',
    paddingHorizontal: 20,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    paddingBottom: 20
  },
  summaryChildContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  summaryTitle: {
    fontSize: 16, 
    fontFamily: 'Helvetica-Bold',
    color: '#36454F'
  },
  summaryStat: {
    fontSize: 20, 
    fontFamily: 'Helvetica-Bold',
    color: '#36454F'
  },
  bannerText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },
  bannerContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    marginTop: 20,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  fridgeContentText: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#36454F'
  }
})