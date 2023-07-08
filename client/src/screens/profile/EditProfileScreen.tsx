import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { View, StyleSheet, TextInput, Text, Image, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from "@rneui/base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootState } from "../../redux/store";
import { UPDATE_USER } from "../../redux/action";
import ImageUploader from "../../components/ImageUploader";
import { AUTHENTICATED_AXIOS_HEADER_FORM, USERS_API } from "../../constants/APIs";
import Avatar from "../../components/shared/Avatar";
import { handleChangeAvatarAction } from "../../redux/features/authSlice";

export default function EditProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.info)
  const token = useSelector((state: RootState) => state.user.token)
  const [data, setData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    dob: new Date(user.dob)
  });
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const handleChange = (key : string, value: any) => {
    setData(currentData => ({
      ...currentData,
      [key]: value
    }));
  }
  const handleSave = () => {
    const date = moment(data.dob).format('YYYY-MM-DD').toString();
    dispatch(UPDATE_USER({ token, data: {...data, dob: date} }));
  }
  const handleChangeAvatar = (image: Blob) => {
    const formData = new FormData();
    formData.append("avatarFile", image);
    formData.append("avatar", user.avatar + 1);
    axios({
      url: USERS_API,
      method: 'PUT',
      headers: AUTHENTICATED_AXIOS_HEADER_FORM(token),
      data: formData
    }).then((res) => {
      dispatch(handleChangeAvatarAction())
      Alert.alert('Avatar updated');
    }).catch((e) => {
      console.log(e);
      Alert.alert('Cannot update');
    })
  }

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.main}>
        <View style={styles.header}>  
          <View style={styles.imageWrap}>
            <Avatar/>
          </View>
          <ImageUploader
            image={null}
            setImage={handleChangeAvatar}
          />
        </View>
        <View style={styles.container}>
        <View>
          <Text>
            First name
          </Text>
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={data.first_name}
            onChangeText={text => handleChange('first_name', text)}
          />
        </View>
          <View>
            <Text>
              Last name
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Last name"
              value={data.last_name}
              onChangeText={text => handleChange('last_name', text)}
            />  
          </View>
          <View>
            <Text>
              Email
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={data.email}
              onChangeText={text => handleChange('email', text)}
              keyboardType="email-address"
            />
          </View>
          <View>
            <Text>Date of birth</Text>
            { data.dob || showPicker
              ?
              <DateTimePicker
                maximumDate={new Date(moment().format('YYYY-MM-DD'))}
                value={data.dob || new Date()}
                onChange={(e) => {
                  handleChange('dob', new Date(e.nativeEvent.timestamp))
                }}
              />
              :
              <Button onPress={() => setShowPicker(true)}>Choose Date</Button>
            }
          </View>
        </View>
        <Button style={styles.submitBtn} title="Save" onPress={handleSave} />
      </ScrollView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    flex: 1,
  },
  header: {
    flex: 1,
    paddingStart: 50,
    justifyContent: 'center',
    padding: 20,
    flexDirection: 'row',
  },
  imageWrap: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: 'rgba(0,0,0, 0.4)',
    borderWidth: 4
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 40,
    borderColor: '#dbdbdb',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  submitBtn: {
  }
})