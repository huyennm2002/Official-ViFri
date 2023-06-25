import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import RecipeItem from '../../components/RecipeItem';

export default function HumanRecipesProvider({navigation}) {
  const recipeList = [{
    id: 1,
  },
  {
    id: 2
  },
  {
    id: 3
  }]

  return (
    <ScrollView>
      {recipeList.map(recipe => <RecipeItem navigation={navigation} key={recipe.id} />)}
    </ScrollView>
  )
}