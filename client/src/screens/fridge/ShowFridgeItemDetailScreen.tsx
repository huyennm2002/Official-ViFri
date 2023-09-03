import React, {useEffect, useState} from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { isEmpty, isNull } from 'lodash';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import Header from '../../components/Header';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formStyles } from '../../styles/commonStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import foodItemUnits from '../../constants/foodItemUnits';
import axios from 'axios';
import { Alert } from 'react-native';
import { UPDATE_ITEM } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { FRIDGE_ITEM_LIST_SCREEN } from '../../constants/screenNames';
import { AUTHENTICATED_AXIOS_HEADER, ITEMS_API } from '../../constants/APIs';
import { RootState } from '../../redux/store';
import moment from 'moment';
import { s3URL } from '../../constants/URL';

// Current work around to prevent the onAnimatedValueUpdate with no listener
const av = new Animated.Value(0);
av.addListener(() => {return});

export default function ShowFridgeItemDetailScreen({ route, navigation }) {
  const [units, setUnits] = useState(foodItemUnits)
  const [value, setValue] = useState('servings');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(route.params.item);
  const token = useSelector((state: RootState) => state.user.token);
  const imageUri = data.image ? s3URL + data.image : '';
  const expirationDate = new Date(data.expiration);

  const dispatch = useDispatch();
  const handleChange = (key: string, value: any) => {
    setData(currentData => ({
      ...currentData,
      [key]: value
    }));
  }
  const handleUpdate = () => {
    dispatch(UPDATE_ITEM({
      token,
      data: {
        ...data,
        unit: value,
        expiration: moment(data.expiration).format('YYYY-MM-DDTHH:mm:ss').split('T')[0]}
      })
    );
    navigation.navigate(FRIDGE_ITEM_LIST_SCREEN);
  }

  return (
    <SafeAreaProvider>
      <Header navigation={navigation}/>
      <DismissKeyboardView style={formStyles.container}>
        <Text
          style={styles.foodTitle}
        >
          {data.name}
        </Text>
        {
          imageUri ? <Image source={{uri: imageUri}} style={styles.itemImage}/>
            : <Image source={require('../../assets/images/chicken-breast.jpg')} style={styles.itemImage} />
        }
        <TextInput
          style={formStyles.textInput}
          placeholder="Quantity"
          keyboardType='numeric'
          onChange={(e) => handleChange('quantity', e.nativeEvent.text)}
          value={String(data.quantity)}
        />
        <DropDownPicker
          multiple={false}
          open={open}
          value={value}
          items={units}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setUnits}
          placeholder='Select unit'
          containerStyle={formStyles.dropDownContainer} 
          addCustomItem={true}
        />
        {
          value == 'custom'
          ? <TextInput style={formStyles.textInput} placeholder='Please enter your custom unit'/> 
          : null
        }
        <DateTimePicker
          value={expirationDate}
          onChange={(e) => {
            handleChange('expiration', e.nativeEvent.timestamp)
          }}
        />
        <Button
          onPress={handleUpdate}
          title="Update"
        />
      </DismissKeyboardView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  itemImage: {
    height: 200,
    width: 200,
    borderRadius: 10
  },
  foodTitle: {
    padding: 1,
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30,
  },
})