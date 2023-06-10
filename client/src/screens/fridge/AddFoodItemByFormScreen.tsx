import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { formStyles } from '../../styles/commonStyles';
import { TextInput } from 'react-native-gesture-handler';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddFoodItemByFormScreen() {
  const [items, setItems] = useState([
    { label: 'Serving', value: 'serving' },
    { label: 'Package', value: 'package' },

  ])

  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaProvider>
      <Header />
      <DismissKeyboardView style={formStyles.container}>
        <Button title='Add food photo'/>
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
          containerStyle={formStyles.dropDownContainer} />
          <Button
          title="Submit"/>
      </DismissKeyboardView>
    </SafeAreaProvider>
  )
}