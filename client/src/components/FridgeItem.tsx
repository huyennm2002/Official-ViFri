import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ListItem } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinus, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SHOW_FRIDGE_ITEM_DETAIL_SCREEN } from '../constants/screenNames';

type ItemType = {
  id: Number,
  name: string,
  status: string,
  expiration: Date,
  image: string,
  amount: Number,
  unit: string,
  added_at: Date
}

export default function FridgeItem({ navigation, item }) {
  const [quantity, setQuantity] = useState(Number(item.quantity));
  const updateQuanity = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
    }
  }

  return (
    <ListItem containerStyle={styles.container}>
      <Image source={require('../assets/images/chicken-breast.jpg')} style={styles.itemImage} />
      <ListItem.Content>
        <ListItem.Title>
          <Text style={styles.foodTitle}>{item.name}</Text>
        </ListItem.Title>
        <ListItem.Subtitle>Expire in 1 day</ListItem.Subtitle>
        <View>
          <Text>Quantity: </Text>
          <View style={styles.numericContainer}>
            <Pressable onPress={() => updateQuanity(1)}>
              <View style={styles.plusInconContainer}>
                <FontAwesomeIcon icon={faPlus} size={24} color='green' />
              </View>
            </Pressable>
            <Text style={styles.quantityText}></Text>
            <Pressable onPress={() => updateQuanity(-1)}>
              <View style={styles.minusIconContainer}>
                <FontAwesomeIcon icon={faMinus} size={24} color='crimson' />
              </View>
            </Pressable>
          </View>
          <Text>{item.unit}</Text>
        </View>
      </ListItem.Content>
      <View style={styles.editActionsContainer}>
        <Pressable onPress={() => {navigation.navigate(SHOW_FRIDGE_ITEM_DETAIL_SCREEN)}}>
          <FontAwesomeIcon icon={faPenToSquare} size={24} />
        </Pressable>
        <Pressable>
          <FontAwesomeIcon icon={faTrash} size={24} />
        </Pressable>
      </View>
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
  },
  foodTitle: {
    fontWeight: 'bold',
    fontSize: 20
  },
  numericContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: 100,
    marginTop: 10
  },
  quantityText: {
    fontSize: 20,
  },
  plusInconContainer: {
    borderColor: 'gray',
    width: 50,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10
  },
  minusIconContainer: {
    width: 50,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10
  },
  editActionsContainer: {
    height: 75,
    justifyContent: 'space-between',
    marginRight: 10
  }
})