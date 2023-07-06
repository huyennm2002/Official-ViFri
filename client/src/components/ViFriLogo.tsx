import React from 'react'
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../redux/store';
import { PROFILE_SCREEN } from '../constants/screenNames';

export default function ViFriLogo({navigation}) {
  const user = useSelector((state: RootState) => state.user.info)
  return (
    <View style={styles.iconGroup}>
      <TouchableOpacity onPress={() => navigation.navigate(PROFILE_SCREEN)}>
        {
          user.avatar
            ?  <Image
                source={{uri: `https://vifri-s3-bucket.s3.us-west-1.amazonaws.com/avatar_${user.id}.jpg`}}
                style={styles.avatarImage}
              />
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