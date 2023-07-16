import { View, Text, StyleSheet, TextInput, Image, Button, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import { isEmpty } from 'lodash';
import DismissKeyboardView from '../../components/DismissKeyboardView'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SIGNIN_SCREEN } from '../../constants/screenNames';
import { Alert } from 'react-native';
import { SIGNUP_API } from '../../constants/APIs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignUpData } from '../../../types';
import { formStyles } from '../../styles/commonStyles';
// Google Sigin package: https://github.com/react-native-google-signin/google-signin

export default function SignUpScreen({ navigation }) {
  const [data, setData] = useState<SignUpData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    dob: new Date(moment().format('YYYY-MM-DD')),
    avatar: null
  })

  const [openPicker, setOpenPicker] = useState(false);

  const checkEmpty = () => {
    return isEmpty(data.first_name) || isEmpty(data.last_name) || isEmpty(data.email) || isEmpty(data.password);
  }

  const handleChange = (key: string, value: any) => {
    setData(currentData => ({
      ...currentData,
      [key]: value
    }));

  }

  const handlePickerChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      handleChange('dob', currentDate);
    }
    else {
      handleOpenTimePicker();
    }
  }

  const handleOpenTimePicker = () => {
    setOpenPicker(!openPicker);
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("dob", data.dob.toString());
    formData.append("avatar", data.avatar);
    if (checkEmpty()) {
      Alert.alert('All fields are required');
      return;
    }
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    axios.post(SIGNUP_API, formData, config)
      .then(() => {
        setData({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          dob: new Date(moment().format('YYYY-MM-DD')),
          avatar: null
        });
        Alert.alert('Sucessfully signed up!\nPlease log in to continue');
        navigation.navigate("SignIn");
      }).catch((err) => {
        Alert.alert(err.message);
      })
  }
  return (
    <DismissKeyboardView style={styles.container}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Text style={styles.brandname}>ViFri</Text>
        <View>
          <Text style={formStyles.inputLabel}>First Name</Text>
          <TextInput style={formStyles.textInput}
            placeholder="John"
            onChangeText={(e) => handleChange('first_name', e)}
          />
        </View>
        <View>
          <Text style={formStyles.inputLabel}>Last Name</Text>
          <TextInput style={formStyles.textInput}
            placeholder="Doe"
            onChangeText={(e) => handleChange('last_name', e)}
          />
        </View>
        <View>
          <Text style={formStyles.inputLabel}>Email</Text>
          <TextInput style={formStyles.textInput}
            placeholder="johndoe@gmail.com"
            onChangeText={(e) => handleChange('email', e)}
          />
        </View>
        <View>
          <Text style={formStyles.inputLabel}>Password</Text>
          <TextInput style={formStyles.textInput}
            placeholder="min. 8 characters"
            secureTextEntry={true}
            onChangeText={(e) => handleChange('password', e)}
          />
        </View>

        {/* Date of birth input */}
        <View style={{ width: 350 }}>
          <Text style={formStyles.inputLabel}>Date of Birth</Text>
          <Modal
            visible={openPicker}
            transparent={true}
            animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  maximumDate={new Date(moment().format('YYYY-MM-DD'))}
                  value={data.dob}
                  display='spinner'
                  mode='date'
                  textColor='black'
                  onChange={handlePickerChange}
                />
                <Pressable
                  style={formStyles.confirmButton}
                  onPress={() => handleOpenTimePicker()}
                >
                  <Text style={formStyles.confirmButtonText}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            onPress={handleOpenTimePicker}
          >
            <TextInput
              style={formStyles.textInput}
              placeholder={String(moment(data.dob).format('YYYY-MM-DD'))}
              editable={false}
              placeholderTextColor='black'
              onPressIn={handleOpenTimePicker}
            />
          </Pressable>
        </View>

        {/* Submit buttons */}
        <Pressable onPress={handleSubmit} style={{...formStyles.confirmButton, width: 350, height: 50}}>
          <Text style={formStyles.confirmButtonText}>Sign Up</Text>
        </Pressable>
        <View style={styles.returnSignInContainer}>
          <Text>Already have an Account?</Text>
          <Pressable style={styles.signInTextContainer} onPress={() => navigation.navigate(SIGNIN_SCREEN)}>
              <Text style={{color: '#42A1FF'}}>Sign In</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </DismissKeyboardView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 1,
    backgroundColor: '#fff',
    flex: 1
  },
  safeAreaContainer: {
    justifyContent: "center",
    alignItems: "center",

  },
  brandname: {
    fontWeight: 'bold',
    fontSize: 50,
    margin: 20,
    fontFamily: 'Baskerville',
    fontStyle: 'italic'
  },
  logo: {
    width: 200,
    height: 200,
    margin: 20
  },
  newusertext: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  confirmButton: {
    backgroundColor: '#FF9966',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 10
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  datePickerContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  returnSignInContainer: {
    flexDirection: 'row',
    marginTop: 15
  },
  signInTextContainer: {
    marginLeft: 5
  }
});
