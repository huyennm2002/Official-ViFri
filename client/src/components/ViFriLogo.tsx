import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ViFriLogo() {
  return (
    <View>
      <Text style = {styles.title}>ViFri</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 26,
        fontFamily: 'Arial',
        fontWeight: 'bold'
    }
})