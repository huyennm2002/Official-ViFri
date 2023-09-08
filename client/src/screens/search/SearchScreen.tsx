import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import SearchHeader from '../../components/search/SearchHeader'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function SearchScreen({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View>
      <SearchHeader navigation={navigation} isFocused={isFocused} handleFocus={handleFocus} handleBlur={handleBlur} />
      {
        isFocused ??
        <ScrollView style={{ flex: 1,  backgroundColor: 'white' }}>
            
        </ScrollView>
      }
    </View>
  )
}