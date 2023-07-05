import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Text, StyleSheet, TextInput, Button, Image, View, Pressable } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DismissKeyboardView from '../../components/DismissKeyboardView'
import Header from '../../components/Header';
import { USER_LOG_OUT } from '../../redux/action';
import { RootState, store } from '../../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import UserProfileHeader from '../../components/user/UserProfileHeader';
import ProfileOptions from '../../components/user/ProfileOptions';

export default function ProfileScreen({navigation}) {
  return (
    <SafeAreaProvider>
      <Header/>
      <UserProfileHeader/>
      <ProfileOptions/>
    </SafeAreaProvider>
  )
}