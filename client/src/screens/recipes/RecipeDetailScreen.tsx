import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import Header from '../../components/Header';
import {AUTHENTICATED_AXIOS_HEADER} from '../../constants/APIs';
import { Card } from '@rneui/themed';
import { store } from '../../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faXmark, faUtensils } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function RecipeDetailScreen({route, navigation}) {
  const {recipe} = route.params
  const serializeIngredient = (ingredient) => {
      return String(roundUpIngredientNumber(ingredient.amount) + " " + ingredient.unit + " " + ingredient.name); 
  }
  const [ instructions, setInstructions ] = useState(null);
  const { token, info } = store.getState().user;

  function roundUpIngredientNumber(number) {
    if (Number.isInteger(number)) {
      return number;
    }
    else {
      return Math.ceil(number * 100) / 100;
    }
  }

  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `http://localhost:3005/human-recipes/${recipe.id}`,
          headers: AUTHENTICATED_AXIOS_HEADER(token)
        })
        console.log(response.data)
        setInstructions(response.data)
      }
      catch(error) {
        console.log(error);
      }
    }

    if (instructions === null) {
      fetchInstructions();
    }
  }, [])
 
  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation}/>
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
          <View style={{ flexDirection: 'row' }}>
            <FontAwesomeIcon style={styles.icon} icon={faCheck} size={20} />
            <Card.FeaturedSubtitle style={styles.subTitle}> Cooking Instructions: </Card.FeaturedSubtitle>
          </View>
          {
            instructions ? (
              <View>
                {instructions.map(instruction => 
                <View key={instruction.number} style={{marginBottom: 5}}>
                  <Text style={styles.stepTitle}>Step {instruction.number}:</Text>
                  <Text style={styles.ingredientText} key={instruction.number}>{`\u2023 ${instruction.step}`}</Text>
                </View>
                )}
              </View>

            ) :
            <Text>Cooking instructions are not yet specified</Text>
          }
          
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
  },
  stepTitle: {
    fontWeight: 'bold',
    marginBottom: 5
  }
})