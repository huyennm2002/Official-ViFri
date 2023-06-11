import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { formStyles } from '../../styles/commonStyles';
import { TextInput } from 'react-native-gesture-handler';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import DropDownPicker from 'react-native-dropdown-picker';
import { CAMERA_SCREEN } from '../../constants/screenNames';

export default function AddFoodItemByFormScreen({navigation}) {
  const [items, setItems] = useState([
    { label: 'Serving', value: 'serving' },
    { label: 'Package', value: 'package' },
    { label: 'Custom Unit', value: 'custom' }
  ])

  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaProvider>
      <Header />
      <DismissKeyboardView style={formStyles.container}>
        <Button title='Add food photo' onPress={() => { navigation.navigate(CAMERA_SCREEN) }}/>
        <TextInput style={formStyles.textInput}
          placeholder="Item Name"
        />
        <TextInput style={formStyles.textInput}
          placeholder="Quantity"
          keyboardType='numeric' />
        <DropDownPicker
          multiple={false}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={formStyles.dropDownContainer} 
          addCustomItem={true}/>
          {value == 'custom' ? 
          <TextInput style={formStyles.textInput} placeholder='Please enter your custom unit'/> : null}
          <TextInput style={formStyles.textInput} keyboardType='numeric' placeholder='Days till expiration'/>
          <Button
          title="Submit"/>
      </DismissKeyboardView>
    </SafeAreaProvider>
  )
}