import { View, Text, Button } from 'react-native'
import React from 'react'

export default function CookingButton({onPress}) {
  return (
    <Button title="Let's cook!" onPress={onPress}/>
  )
}