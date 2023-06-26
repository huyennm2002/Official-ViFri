import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { PROFILE_SCREEN } from '../constants/screenNames';

export default function ViFriLogo({navigation}) {
  const user = useSelector((state: RootState) => state.user.info)
  return (
    <View style={styles.iconGroup}>
      <TouchableOpacity onPress={() => navigation.navigate(PROFILE_SCREEN)}>
        {/* {
          user.avatar
            ?  <Image
              source={{uri: `s3://vifri-s3-bucket/avatar_${user.id}.jpg`}}
              ></Image>
            : <FontAwesomeIcon icon={faCircleUser} size={30} style={styles.avatarIcon} />
        } */}
        <FontAwesomeIcon icon={faCircleUser} size={30} style={styles.avatarIcon} />
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
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 30/ 2,
    color: 'white'
  }
})