import { View, Text, Button, TextInput } from 'react-native'
import React from 'react'
import DismissKeyboardView from './DismissKeyboardView'
import { formStyles } from '../styles/commonStyles'
import DropDownPicker from 'react-native-dropdown-picker'
import { CAMERA_SCREEN } from '../constants/screenNames'

export default function FoodItemForm({navigation, value, open, items, setOpen, setValue, setItems}) {
  return (
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
  )
}