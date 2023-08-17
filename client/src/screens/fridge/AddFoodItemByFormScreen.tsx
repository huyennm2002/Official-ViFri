import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { View, Text, Button, Image, ScrollView } from 'react-native'
import { store } from '../../redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { isEmpty, isNull } from 'lodash';
import { Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import { formStyles } from '../../styles/commonStyles';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import { CAMERA_SCREEN, FRIDGE_ITEM_LIST_SCREEN } from '../../constants/screenNames';
import foodItemUnits from '../../constants/foodItemUnits';
import { AUTHENTICATED_AXIOS_HEADER, ITEMS_API } from '../../constants/APIs';
import { ADD_ITEM } from '../../redux/action';
import { ItemData } from '../../../types';

export default function AddFoodItemByFormScreen({ navigation, route }) {
  const [items, setItems] = useState(foodItemUnits)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [camera, setCamera] = useState(false);
  const [data, setData] = useState<ItemData>({
    name: '',
    image: null,
    quantity: 0,
    unit: '',
    expiration: new Date()
  })
  const { token, info } = store.getState().user;
  const dispatch = useDispatch();
  const checkEmpty = () => {
    return isEmpty(data.name) || data.quantity == 0 || isEmpty(value) || isNull(data.expiration);
  }
  const handleChange = (key: string, value: any) => {
    if (key === 'expiration') {
      value = new Date(value.nativeEvent.timestamp);
    }
    setData(currentData => ({
      ...currentData,
      [key]: value
    }));
  }

  const handleSubmit = () => {
    if (checkEmpty()) {
      Alert.alert('All fields are required');
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);
    formData.append("quantity", data.quantity.toString());
    formData.append("unit", value);
    formData.append("expiration", data.expiration.toString());
    const config = {
      headers: AUTHENTICATED_AXIOS_HEADER(token)
    }
    axios.post(ITEMS_API, formData, config)
      .then(() => {
        setData({
          name: '',
          image: null,
          quantity: 0,
          unit: '',
          expiration: new Date()
        });
        Alert.alert('Item added');
        dispatch(ADD_ITEM)
        navigation.navigate(FRIDGE_ITEM_LIST_SCREEN);
      }).catch((err) => {
        Alert.alert(err.message);
      })
  }
  useEffect(() => {
    if (route.params?.image) {
      const img = {
        name: `items/${info.id}/` + Math.random.toString,
        uri: route.params.image.uri,
        type: 'image/jpg'
      }
      handleChange("image", img);
    }
  }, [route.params?.image]);

  return (
    <SafeAreaProvider>
      <Header />
      <DismissKeyboardView style={formStyles.container}>
        {data.image &&
          <Image source={{ uri: 'data:image/jpg;base64,' + route.params?.image.base64 }} style={{ width: 200, height: 200 }} />
        }
        <Button title='Add food photo' onPress={() => { navigation.navigate(CAMERA_SCREEN) }} />
        <TextInput style={formStyles.textInput}
          placeholder="Item Name"
          value={data.name}
          onChangeText={(e) => handleChange('name', e)}
        />
        <TextInput
          style={formStyles.textInput}
          placeholder="Quantity"
          keyboardType='numeric'
          onChangeText={(e) => handleChange('quantity', e)}
        />
        <DropDownPicker
          multiple={false}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={formStyles.dropDownContainer}
          addCustomItem={true}
        />
        {value == 'custom' ?
          <TextInput style={formStyles.textInput} placeholder='Please enter your custom unit' /> : null}
        <Text> Expiration Date </Text>
        <DateTimePicker
          value={new Date()}
          display="spinner"
          onChange={(e) => handleChange('expiration', e)}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </DismissKeyboardView>
    </SafeAreaProvider>
  )
}