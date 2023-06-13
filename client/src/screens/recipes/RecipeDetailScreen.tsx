import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../components/Header';
import { Card } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

const usedIngredients = [
  "Lorem ipsum dolor",
  "Lorem ipsum do",
  "Lorem ipsum dolo"
];

const missingIngredients = [
  "Lorem ipsum dolor",
  "Lorem ipsum do",
  "Lorem ipsum dolo"
];

export default function RecipeDetailScreen() {
  return (
    <View>
      <Header />
      <ScrollView>

        <Card containerStyle={styles.container}>
          <Card.Title style={styles.title}>Honey Soy Sauce Chicken Breast</Card.Title>
          <Card.Divider />
          <Card.Image source={require('../../assets/images/honey-garlic-chicken.jpg')} />
          <View style={{ flexDirection: 'row' }}>
            <FontAwesomeIcon style={styles.icon} icon={faCheck} size={20} color='green' />
            <Card.FeaturedSubtitle style={styles.subTitle}> Ready Ingredients: </Card.FeaturedSubtitle>
          </View>
          <View>
            {usedIngredients.map(ingredient => <Text style={styles.ingredientText} key={ingredient}>{`\u2023 ${ingredient}`}</Text>)}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesomeIcon style={styles.icon} icon={faXmark} size={20} color='red' />
            <Card.FeaturedSubtitle style={styles.subTitle}>Missing Ingredients: </Card.FeaturedSubtitle>
          </View>
          <View>
            {missingIngredients.map(ingredient => <Text style={styles.ingredientText} key={ingredient}>{`\u2023 ${ingredient}`}</Text>)}
          </View>
          <Card.FeaturedSubtitle style={styles.subTitle}> Cooking Instructions: </Card.FeaturedSubtitle>
          <Text style={styles.instructions}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </Text>
        </Card>
      </ScrollView>
    </View>
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
  title: {
    fontSize: 20
  },
  thumbNail: {
    borderRadius: 5,
  },
  subTitle: {
    marginTop: 10,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  ingredientText: {
    fontSize: 16
  },
  icon: {
    marginTop: 10
  },
  instructions: {
    fontSize: 16
  }
})