import { View, Text, StyleSheet, TextInput, Keyboard, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function SearchInput({ handleFocus, handleBlur, containerWidth, autoFocus }) {


    return (
        <View>
            <View style={[styles.searchInputContainer, { width: containerWidth }]}>
                <TextInput
                    autoFocus={autoFocus}
                    style={styles.searchInput}
                    placeholder='Start Searching...'
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    searchInputContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 250, // Set the initial width to match the containerWidth,
    },
    searchInput: {
        fontSize: 16,
        padding: 5.4,
        width: '100%',
    },
});