import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { isEmpty, isNull } from 'lodash';
import Header from '../../components/Header';
import { formStyles } from '../../styles/commonStyles';
import { TextInput } from 'react-native-gesture-handler';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { CAMERA_SCREEN, FRIDGE_ITEM_LIST_SCREEN } from '../../constants/screenNames';
import foodItemUnits from '../../constants/foodItemUnits';
import FoodItemForm from '../../components/FoodItemForm';
import { Alert } from 'react-native';
import axios from 'axios';
import { AUTHENTICATED_AXIOS_HEADER, ITEMS_API } from '../../constants/APIs';
import { store } from '../../redux/store';

type ItemData = {
  name: string,
  image: Blob,
  quantity: number,
  unit: string,
  expiration: Date
}

export default function AddFoodItemByFormScreen({navigation}) {
  const [items, setItems] = useState(foodItemUnits)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [data, setData] = useState<ItemData>({
    name: '',
    image: null,
    quantity: 0,
    unit: '',
    expiration: new Date()
  })
  const { token } = store.getState().user;
  const checkEmpty = () => {
    return isEmpty(data.name) || data.quantity == 0 || isEmpty(value) || isNull(data.expiration) ;
  }
  const handleChange = (key: string, value: any) => {
    setData(currentData => ({
      ...currentData,
      [key]: value
    }));
  }

  const handleSubmit = () => {
    if (checkEmpty()) {
      console.log()
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
    console.log(config);
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
        navigation.navigate(FRIDGE_ITEM_LIST_SCREEN);
      }).catch((err) => {
        Alert.alert(err.message);
      })
  }

  return (
    <SafeAreaProvider>
      <Header />
      <DismissKeyboardView style={formStyles.container}>
        <Button title='Add food photo' onPress={() => { navigation.navigate(CAMERA_SCREEN) }}/>
        <TextInput style={formStyles.textInput}
          placeholder="Item Name"
          value={data.name}
          onChangeText={(e) => handleChange('name', e)}
        />
        <TextInput style={formStyles.textInput}
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
        {data.unit == 'custom' ? 
        <TextInput style={formStyles.textInput} placeholder='Please enter your custom unit'/> : null}
        <Text> Expiration Date </Text> 
        <DateTimePicker
          value={new Date()}
          display="spinner"
          onChange={(e) => handleChange('expiration', e)}
        />
        <Button title="Submit" onPress={handleSubmit}/>
      </DismissKeyboardView>
    </SafeAreaProvider>
  )
}