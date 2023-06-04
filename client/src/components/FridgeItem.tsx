import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { ListItem } from '@rneui/themed';

export default function FridgeItem() {
  return (
    <ListItem containerStyle={styles.container}>
      <Image source={require('../assets/images/chicken-breast.jpg')} style={styles.itemImage}/>
      <ListItem.Content>
        <ListItem.Subtitle>
            <Text>Chicken Breast</Text>
        </ListItem.Subtitle>
        <ListItem.Subtitle>Exp: Today</ListItem.Subtitle>
        <ListItem.Subtitle>Serving: 3</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 4,
        elevation: 2
    },
    itemImage: {
        height: 100,
        width: 100,
        borderRadius: 10
    }
})