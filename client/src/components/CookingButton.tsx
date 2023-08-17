import { View, Text, Button, Pressable } from 'react-native'
import React from 'react';
import { formStyles } from '../styles/commonStyles';

export default function CookingButton({onPress}) {
  return (
    <Pressable style={{...formStyles.confirmButton, width: '50%', marginTop: 10}} onPress={onPress}>
      <Text style={formStyles.confirmButtonText}>
      Let's Cook!
      </Text>
    </Pressable>
  )
}