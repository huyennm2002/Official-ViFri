import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const ImageUploader = (props) => {
  const {
    image,
    setImage
  } = props

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      }).then((result) => {
        if (!result.canceled) {
          setImage({
            name: new Date() + '_avatar',
            uri: result.assets[0].uri,
            type: 'image/jpg',
          })
        }
      }).catch((e) => {
        Alert.alert(e);
      })
    } else {
      Alert.alert("Please enable access to camera.")
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Upload image" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200, borderRadius: 200 }} />}
    </View>
  );
}

export default ImageUploader;
