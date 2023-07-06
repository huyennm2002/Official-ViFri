import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import UserProfileHeader from '../../components/user/UserProfileHeader';
import ProfileOptions from '../../components/user/ProfileOptions';

export default function ProfileScreen({navigation}) {
  return (
    <SafeAreaProvider>
      <Header/>
      <UserProfileHeader/>
      <ProfileOptions navigation={navigation}/>
    </SafeAreaProvider>
  )
}