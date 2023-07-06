import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { View, StyleSheet, TextInput, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from "@rneui/base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { User } from "../../../types";
import moment from "moment";
import UserProfileHeader from "../../components/user/UserProfileHeader";
import { UPDATE_USER } from "../../redux/action";

export default function EditProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.info)
  const [data, setData] = useState<User>(user);
  const [showPicker, setShowPicker] = useState(false);
  const {
    id,
    email,
    first_name,
    last_name,
    dob
  } = user;
  console.log(data);
  const handleChange = (key : string, value: any) => {
    setData(currentData => ({
      ...currentData,
      [key]: value
    }));
  }
  const handleSave = () => {
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("dob", dob.toString());
    dispatch(UPDATE_USER({ token, data }));
  }

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.main}>
        <View style={styles.header}>  
          <View style={styles.imageWrap}>
            <Image
              style={styles.avatarImage}
              source={{uri: `https://vifri-s3-bucket.s3.us-west-1.amazonaws.com/avatar_${user.id}.jpg`}}
            />
          </View>
        </View>
        <View style={styles.container}>
        <View>
          <Text>
            First name
          </Text>
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={first_name}
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
              value={last_name}
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
              value={email}
              onChangeText={text => handleChange('email', text)}
              keyboardType="email-address"
            />
          </View>
          <View>
            <Text>Date of birth</Text>
            {
              dob &&
              <DateTimePicker
                maximumDate={new Date(moment().format('YYYY-MM-DDTHH:mm:ss'))}
                value={dob}
                onChange={(e) => {
                  handleChange('dob', new Date(e.nativeEvent.timestamp))
                }}
              />
            }
            {
              !dob && !showPicker && <Button onPress={() => setShowPicker(true)}>Choose Date</Button>
            }
            { showPicker &&
              <DateTimePicker
              maximumDate={new Date(moment().format('YYYY-MM-DDTHH:mm:ss'))}
              value={new Date()}
              onChange={(e) => {
                handleChange('dob', new Date(e.nativeEvent.timestamp))
              }}
            />
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageWrap: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: 'rgba(0,0,0, 0.4)',
    borderWidth: 4
  },
  avatarImage: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 4,
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