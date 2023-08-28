import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import CookingButton from '../../components/CookingButton';
import axios from 'axios';
import { store } from '../../redux/store';
import { Card } from '@rneui/themed';
import { AUTHENTICATED_AXIOS_HEADER } from '../../constants/APIs';
import { ScrollView } from 'react-native-gesture-handler';
import { AIRecipeType, GptRecipesProviderProps } from './recipesType';
import { faL } from '@fortawesome/free-solid-svg-icons';

export default function GptRecipesProvider({ingredients}: GptRecipesProviderProps) {
  const [AIRecipe, setAIRecipe] = useState<AIRecipeType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token, info } = store.getState().user;

  const onCookingButtonPress = async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: 'get',
        url: `http://localhost:3005/ai-recipes?ingredients=${ingredients}`,
        headers: AUTHENTICATED_AXIOS_HEADER(token)
      })
      setAIRecipe(prevState => response.data);
    } catch(error) {
      console.log(error);
  
    } finally {
      setIsLoading(false);
    } 
  }
  
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <CookingButton onPress={async () => await onCookingButtonPress()}/>
      {
        isLoading ? <ActivityIndicator size={"large"} color="#EE8F66" />
        :
        AIRecipe && 
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
          </ScrollView>
      }
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