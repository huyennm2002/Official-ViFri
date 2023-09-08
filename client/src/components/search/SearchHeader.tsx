import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Keyboard } from 'react-native';
import { Header as HeaderRNE } from '@rneui/themed';
import { Pressable } from 'react-native';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import SearchInput from './SearchInput';

export default function SearchHeader({ navigation, isFocused, handleFocus, handleBlur }) {
    const containerWidth = isFocused ? 320 : 300;

    return (
        <HeaderRNE
            containerStyle={styles.headerContainer}
            backgroundColor='tomato'
            leftComponent={
                (!isFocused ?
                    <Pressable onPress={() => { navigation.goBack() }}>
                        <FontAwesomeIcon color='white' size={24} icon={faChevronLeft} />
                    </Pressable>
                    : <SearchInput autoFocus={true} handleFocus={handleFocus} handleBlur={handleBlur} containerWidth={containerWidth} />)

            }

            centerComponent={
                (!isFocused ?
                    <SearchInput autoFocus={false} handleFocus={handleFocus} handleBlur={handleBlur} containerWidth={containerWidth} />
                    : null
                )

            }

            rightComponent={

                (!isFocused ?
                    <Pressable>
                        <FontAwesomeIcon color='white' icon={faBell} size={24} />
                    </Pressable>
                    : <Pressable onPress={handleBlur} style={styles.cancelTextContainer}>
                        <Text style={{color: 'white'}}>Cancel</Text>
                    </Pressable>)
            }

        />
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchInputContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 250, // Set the initial width to match the containerWidth
    },
    searchInput: {
        fontSize: 16,
        padding: 5.4,
        width: '100%',
    },
    cancelTextContainer: { 
        alignContent: "center", 
        justifyContent: "center", 
        flex: 1, 
        marginLeft: 10,
        color: 'white'
    }
});
