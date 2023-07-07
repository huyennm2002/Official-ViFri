import React from 'react'
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../redux/store';
import { PROFILE_SCREEN } from '../constants/screenNames';
import Avatar from './shared/Avatar';

export default function ViFriLogo({navigation}) {
  const user = useSelector((state: RootState) => state.user.info)
  return (
    <View style={styles.iconGroup}>
      <TouchableOpacity onPress={() => navigation.navigate(PROFILE_SCREEN)}>
        {
          user.avatar
            ?
              <Avatar customStyle={styles.avatarImage}/>
            : <FontAwesomeIcon icon={faCircleUser} size={30} style={styles.avatarIcon} />
        }
      </TouchableOpacity>
      <Text style = {styles.title}>ViFri</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  iconGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    fontSize: 26
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontFamily: 'Arial',
    fontWeight: 'bold'
  },
  avatarIcon: {
    marginRight: 5,
    width: 30,
    height: 30,
    borderRadius: 30/ 2,
    color: 'white'
  },
  avatarImage: {
    marginRight: 5,
    width: 30,
    height: 30,
    borderRadius: 30/ 2
  }
})