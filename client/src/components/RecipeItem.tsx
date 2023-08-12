import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Card } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as faHeartReg } from '@fortawesome/free-regular-svg-icons/faHeart';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons/faShareNodes';
import { RECIPE_DETAILS_SCREEN } from '../constants/screenNames';
import { HumanRecipe } from '../screens/recipes/recipesType';

interface RecipeItemPropsType {
    navigation: any,
    recipe: HumanRecipe
}
export default function RecipeItem({navigation, recipe}: RecipeItemPropsType) {
    const [isFavourite, setFavourite] = useState(false);
    const handleFavouritePress = () => {
        setFavourite(!isFavourite);
    }

    return (
        <Pressable onPress={() => navigation.navigate(RECIPE_DETAILS_SCREEN, {recipe})}>
            <Card containerStyle={styles.container}>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Image containerStyle={styles.thumbnail} source={{uri: recipe.image}} />
                <View style={styles.footer}>
                    <Pressable onPress={handleFavouritePress}>
                        <FontAwesomeIcon icon={isFavourite ? faHeartSolid : faHeartReg} color={isFavourite ? 'crimson' : 'black'} size={30} />
                    </Pressable>
                    <FontAwesomeIcon style={styles.shareIcon} icon={faShareNodes} size={30} />
                </View>
            </Card>
        </Pressable>
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
        elevation: 2,
        width: 360
    },
    thumbnail: {
        borderRadius: 5
    },
    recipePreview: {
        marginTop: 2
    },
    footer: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row'
    },
    shareIcon: {
        marginLeft: 15
    }
})