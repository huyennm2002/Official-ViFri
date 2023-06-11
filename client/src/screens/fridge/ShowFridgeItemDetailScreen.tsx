import React from 'react';
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import Header from '../../components/Header';
import { formStyles } from '../../styles/commonStyles';

export default function ShowFridgeItemDetailScreen() {
  return (
    <SafeAreaProvider>
      <Header/>
      <DismissKeyboardView style={formStyles.container}>
        <TextInput placeholder='food title' style={formStyles.textInput}/>
      </DismissKeyboardView>
    </SafeAreaProvider>
  )
}