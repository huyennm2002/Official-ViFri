import { View, Text, Pressable } from 'react-native'
import React from 'react'
import SearchHeader from '../../components/search/SearchHeader'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function SearchScreen({navigation}) {
  return (
    <View>
      <SearchHeader navigation={navigation} autoFocus={false}/>
      <Pressable style={{flex: 1}}></Pressable>
    </View>
  )
}