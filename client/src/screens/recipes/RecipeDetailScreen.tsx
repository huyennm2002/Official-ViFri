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

export default function RecipeDetailScreen({route, navigation}) {
  const {recipe} = route.params
  const serializeIngredient = (ingredient) => {
      return String(ingredient.amount + " " + ingredient.unit + " " + ingredient.name); 
  }

  return (
    <View style={{flex: 1}}>
      <Header />
      <ScrollView>
        <Card containerStyle={styles.container}>
          <Card.Title style={styles.title}>{recipe.title}</Card.Title>
          <Card.Divider />
          <Card.Image source={{uri: recipe.image}} />
          <View style={{ flexDirection: 'row' }}>
            <FontAwesomeIcon style={styles.icon} icon={faCheck} size={20} color='green' />
            <Card.FeaturedSubtitle style={styles.subTitle}> Ready Ingredients: </Card.FeaturedSubtitle>
          </View>
          <View>
            {recipe.usedIngredients.map(ingredient => <Text style={styles.ingredientText} key={ingredient.name}>{`\u2023 ${serializeIngredient(ingredient)}`}</Text>)}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesomeIcon style={styles.icon} icon={faXmark} size={20} color='red' />
            <Card.FeaturedSubtitle style={styles.subTitle}>Missing Ingredients: </Card.FeaturedSubtitle>
          </View>
          <View>
            {recipe.missedIngredients.map(ingredient => <Text style={styles.ingredientText} key={ingredient.name}>{`\u2023 ${serializeIngredient(ingredient)}`}</Text>)}
          </View>
          <Card.FeaturedSubtitle style={styles.subTitle}> Cooking Instructions: </Card.FeaturedSubtitle>
          <Text style={styles.instructions}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. dafafer dasdeaad, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
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