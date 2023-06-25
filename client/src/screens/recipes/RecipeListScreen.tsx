import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RecipeItem from '../../components/RecipeItem';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DropDownPicker from 'react-native-dropdown-picker';
import HumanRecipesProvider from './HumanRecipesProvider';
import GptRecipesProvider from './GptRecipesProvider';

export default function RecipeListScreen({ navigation }) {
    const [value, setValue] = useState([]);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Avocado', value: 'avocado' },
        { label: 'Banana', value: 'banana' },
        { label: 'Basil', value: 'basil' },
        { label: 'Beef', value: 'beef' },
        { label: 'Beer', value: 'beer' },
        { label: 'Bell peppers', value: 'bell peppers' },
        { label: 'Bread', value: 'bread' },
    ]);
    const [open, setOpen] = useState(false);

    const RecipesProvidersTab = createMaterialTopTabNavigator();

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <View style={styles.dropdownContainer}>
            <DropDownPicker
                searchable={true}
                containerStyle={styles.ingredientsContainer}
                style={styles.dropdownStyle}
                open={open}
                multiple={true}
                items={items}
                value={value}

                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                mode="BADGE"
                badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                placeholder="Search or add Ingredients" 
                />
            </View>
            <RecipesProvidersTab.Navigator style={styles.recipesNavigationContainer}>
                <RecipesProvidersTab.Screen name="HumanProvider" children={() => <HumanRecipesProvider navigation={navigation} ingredients={value}/>} options={{title: "Human Recipes"}}/>
                <RecipesProvidersTab.Screen name="GptProvider" children={() => <GptRecipesProvider ingredients={value}/>} options={{title: "AI Recipes"}}/>
            </RecipesProvidersTab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flexGrow: 1
    },
    ingredientsContainer: {
        width: 360,
        borderRadius: 0,
        marginTop: 16,
    },
    dropdownContainer: {
        alignItems: 'center', 
        zIndex: 100
    },
    dropdownStyle: {
        height: 80,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1
    },
    recipesNavigationContainer: {
        flexGrow: 1, 
        zIndex: 50, 
        marginBottom: 10
    }
})