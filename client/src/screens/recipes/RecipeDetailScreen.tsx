import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../components/Header';
import { Card } from '@rneui/themed';

export default function RecipeDetailScreen() {
  return (
    <ScrollView>
      <Header />
      <Card containerStyle={styles.container}>
          <Card.Title>Honey Soy Sauce Chicken Breast</Card.Title>
          <Card.Divider/>
          <Card.Image source={require('../../assets/images/honey-garlic-chicken.jpg')}/>
          <Card.FeaturedSubtitle style={styles.subTitle} h4>Used Ingredients: </Card.FeaturedSubtitle>
     </Card>
    </ScrollView>
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
  thumbNail: {
    borderRadius: 5,
  },
  subTitle: {
    marginTop: 10,
    color: 'black'
  },
})