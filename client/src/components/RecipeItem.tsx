import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Card } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as faHeartReg } from '@fortawesome/free-regular-svg-icons/faHeart';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons/faShareNodes';

export default function RecipeItem() {
    const [isFavourite, setFavourite] = useState(false);
    const handleFavouritePress = () => {
        setFavourite(!isFavourite);
    }

     return (
        <Card containerStyle={styles.container}>
            <Card.Title>Honey Soy Sauce Chicken breast</Card.Title>
            <Card.Image containerStyle={styles.thumbnail} source={require('../assets/images/chicken-breast.jpg')} />
            <Text style={styles.recipePreview}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            </Text>
            <View style={styles.footer}>
                <Pressable onPress={handleFavouritePress}>
                    <FontAwesomeIcon icon={isFavourite ? faHeartSolid : faHeartReg}  color={isFavourite ? 'crimson' : 'black' } size={30}/>
                </Pressable>
                <FontAwesomeIcon style={styles.shareIcon} icon={faShareNodes} size={30}/>
            </View>
        </Card>
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
    thumbnail: {
        borderRadius: 5
    },
    recipePreview: {
        marginTop: 2
    },
    footer: {
        marginTop: 8,
        display:'flex',
        flexDirection: 'row'
    },
    shareIcon: {
        marginLeft: 15
    }
})