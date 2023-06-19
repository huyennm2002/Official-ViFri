import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Text, StyleSheet, TextInput, Button, Image } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DismissKeyboardView from '../../components/DismissKeyboardView'
import Header from '../../components/Header';
import { USER_LOG_OUT } from '../../redux/action';
import { RootState, store } from '../../redux/store';

export default function ProfileScreen({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user)
  const handleLogOut = () => {
    dispatch(USER_LOG_OUT);
  }
  return (
    <SafeAreaProvider>
      <Header/>
      <DismissKeyboardView style={styles.container}>
        <Image style={styles.logo}
          source={{
            uri: `https://vifri-s3-bucket.s3.us-west-1.amazonaws.com/avatar_${user.id}.jpg`,
          }}
        />
        <Text style={styles.brandname}>Update info</Text>
        <TextInput style={styles.textinput}
          placeholder="Username"
        />
        <TextInput style={styles.textinput}
          placeholder="Email"
        />
        <Button
          title="Submit"
        />
        <Button
          title="Logout"
          onPress={handleLogOut}
        />
      </DismissKeyboardView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center"
  },
  textinput: {
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 23,
    margin: 15,
    width: 290,
    fontSize: 20,
    height: 60
  },
  brandname: {
    fontWeight: 'bold',
    fontSize: 36,
    margin: 10
  },
  dropdown: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 300
  },
  dropdownHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  logo: {
    width: 300,
    height: 300,
    margin: 20
  },
});