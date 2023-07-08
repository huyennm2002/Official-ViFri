import { View, Text } from 'react-native'
import React from 'react'
import CookingButton from '../../components/CookingButton';

export default function GptRecipesProvider({ingredients}) {
  const onCookingButtonPress = () => {
    console.log(ingredients);
  }

  return (
    <View>
      <CookingButton onPress={() => onCookingButtonPress()}/>
    </View>
  )
}