import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { Header as HeaderRNE } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ViFriLogo from './ViFriLogo';

export default function Header() {
    return (
        <HeaderRNE
            backgroundColor='tomato'
            leftComponent={<ViFriLogo />}
            rightComponent={
                <View style={styles.icons}>
                    <FontAwesomeIcon size={26} style={styles.firstIcon} color='white' icon={faMagnifyingGlass} />
                    <FontAwesomeIcon size={26} color='white' icon={faBell} />
                </View>
            } />
    )
}

const styles = StyleSheet.create({
    icons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        fontSize: 26
    },
    firstIcon: {
        marginRight: 15
    }
})