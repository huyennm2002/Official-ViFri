import React, {useState} from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DismissKeyboardView from '../../components/DismissKeyboardView';
import Header from '../../components/Header';
import { formStyles } from '../../styles/commonStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import foodItemUnits from '../../constants/foodItemUnits';


export default function ShowFridgeItemDetailScreen() {
  const [items, setItems] = useState(foodItemUnits)

  const [value, setValue] = useState('serving');
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaProvider>
      <Header/>
      <DismissKeyboardView style={formStyles.container}>
        <Image source={require('../../assets/images/chicken-breast.jpg')} style={styles.itemImage}/>
        <TextInput placeholder='food title' style={formStyles.textInput} value='Chicken Breast' editable={false}/>
        <TextInput style={formStyles.textInput}
          placeholder="Quantity"
          keyboardType='numeric'
          value='3' />
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
          <TextInput style={formStyles.textInput} value='2' keyboardType='numeric' placeholder='Days till expiration'/>
          <Button
          title="Submit"/>
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
})