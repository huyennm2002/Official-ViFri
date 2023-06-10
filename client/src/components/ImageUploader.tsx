import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  // const [galleryPermission, setGalleryPermission] = useState(null);
  // useEffect(() => {
  //   (async () => {
  //     const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     setGalleryPermission(status.status === 'granted');
  //   })();
  // }, [])
  const pickImage = async () => {
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status.status) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } else {
      Alert.alert("Please enable access to camera.")
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

export default ImageUploader;
