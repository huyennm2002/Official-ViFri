import React from 'react'
import { useSelector } from 'react-redux';
import { Text, StyleSheet, Image, View, ImageBackground } from 'react-native'
import { RootState } from '../../redux/store';
import Avatar from '../shared/Avatar';

export default function UserProfileHeader() {
    const user = useSelector((state: RootState) => state.user.info)

    return (
        <ImageBackground style={styles.container} source={require('../../assets/images/profile-bg.jpeg')}>
            <View style={styles.header}>  
                <View style={styles.imageWrap}>
                    <Avatar/>
                 </View>
                <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        width: null,
        alignSelf: 'stretch',
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    imageWrap: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderColor: 'rgba(0,0,0, 0.4)',
        borderWidth: 4
    },
    name: {
        marginTop: 10,
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    }
});