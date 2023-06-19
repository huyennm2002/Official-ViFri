import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RecipeItem from '../../components/RecipeItem';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import DropDownPicker from 'react-native-dropdown-picker';

export default function RecipeListScreen({ navigation }) {
    const recipeList = [{
        id: 1,
    },
    {
        id: 2
    },
    {
        id: 3
    }]

    const [value, setValue] = useState(['']);
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

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Header />
            {/* <View> */}
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
                placeholder="Search or add Ingredients" />
            <Button title="Let's cook!" />
            {/* </View> */}
            <ScrollView style={styles.container} >
                {recipeList.map(recipe => <RecipeItem navigation={navigation} key={recipe.id} />)}
            </ScrollView>
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
    }
})