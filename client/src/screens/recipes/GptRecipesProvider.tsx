import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CookingButton from '../../components/CookingButton';
import axios from 'axios';
import { store } from '../../redux/store';
import { Card } from '@rneui/themed';
import { AUTHENTICATED_AXIOS_HEADER } from '../../constants/APIs';
import { ScrollView } from 'react-native-gesture-handler';

interface GptRecipesProviderProps {
  ingredients: string[]
}

interface AIRecipeType {
  title: string,
  ingredients: string[],
  instructions: string[]
}
export default function GptRecipesProvider({ingredients}: GptRecipesProviderProps) {
  const [AIRecipe, setAIRecipe] = useState<AIRecipeType | null>(null);
  const { token, info } = store.getState().user;
  const onCookingButtonPress = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:3005/ai-recipes?ingredients=${ingredients}`,
        headers: AUTHENTICATED_AXIOS_HEADER(token)
      })
      setAIRecipe(prevState => response.data);
    } catch(error) {
      console.log(error);
    }
    
  }
  
  return (
    <View style={{flex: 1}}>
      <CookingButton onPress={async () => await onCookingButtonPress()}/>
      {AIRecipe && 
      <ScrollView>
        <Card>
          <Card.Title>{AIRecipe.title}</Card.Title>
          <Card.Divider/>
          <Card.FeaturedTitle style={styles.subTitle}>Ingredients:</Card.FeaturedTitle>
          <View>
            {AIRecipe.ingredients.map(ingredient => <Text key={ingredient}>{ingredient}</Text>)}
          </View>
          <View>
            <Card.FeaturedSubtitle style={styles.subTitle}>Cooking Instructions</Card.FeaturedSubtitle>
          </View>
          <View>
            {AIRecipe.instructions.map(step => <Text key={step[0]}>{step}</Text>)}
          </View>
        </Card>
      </ScrollView>}
    </View>
  )

}

const styles = StyleSheet.create({
  subTitle: {
    marginTop: 10,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  }
})