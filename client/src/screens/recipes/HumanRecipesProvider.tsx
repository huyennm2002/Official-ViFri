import { View, Text, ScrollView, Button, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import axios from 'axios';
import {AUTHENTICATED_AXIOS_HEADER} from '../../constants/APIs';
import { store } from '../../redux/store';
import RecipeItem from '../../components/RecipeItem';
import CookingButton from '../../components/CookingButton';
import { HumanRecipe, HumanRecipesProviderPropsType, Ingredient } from './recipesType';
export default function HumanRecipesProvider({navigation, ingredients}: HumanRecipesProviderPropsType) {
  const [ recipes, setRecipes ] = useState<HumanRecipe[] | []>([]);
  const { token, info } = store.getState().user;
  const [ isLoading, setIsLoading] = useState(false);
  
  const onCookingButtonPress = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: 'get',
        url: `http://localhost:3005/human-recipes?ingredients=${ingredients}`,
        headers: AUTHENTICATED_AXIOS_HEADER(token)
      })
      setRecipes(prevState => [...response.data]);
      console.log("recipes state");
      console.log(recipes);
    }
    catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={{alignItems:'center'}}>
      <CookingButton onPress={() => onCookingButtonPress()}/>
      {isLoading ? <ActivityIndicator size={"large"} color="#EE8F66"/>
      : recipes.map(recipe => <RecipeItem navigation={navigation} key={recipe.id} recipe={recipe}/>)}
    </ScrollView>
  )
}