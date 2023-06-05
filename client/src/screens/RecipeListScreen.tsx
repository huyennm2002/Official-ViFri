import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '@rneui/themed';
import { CardImage } from '@rneui/base/dist/Card/Card.Image';
import RecipeItem from '../components/RecipeItem';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../components/Header';

export default function RecipeListScreen() {
    const recipeList = [{
        id: 1
    }]
    return (
        <SafeAreaProvider>
            <Header />
            <ScrollView style={styles.container}>
                {recipeList.map(recipe => <RecipeItem key={recipe.id} />)}
            </ScrollView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    }
})