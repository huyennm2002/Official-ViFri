import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { SafeAreaView } from 'react-native-safe-area-context'
import CameraButton from '../../components/CameraButton'
import { ADD_FOOD_ITEM_BY_FORM_SCREEN } from '../../constants/screenNames'
import { store } from '../../redux/store'

export default function CameraScreen({navigation}) {
    const [type, setType] = useState(CameraType.back);
    const cameraRef = useRef(null);
    const [hasPermisison, setHasPermission] = useState<boolean>(null);
    const [imageUri, setImageUri] = useState(null);
    const { id } = store.getState().user.info
    useEffect(() => {
        (async () => {
            const permissionStatus = await Camera.requestCameraPermissionsAsync();
            setHasPermission(permissionStatus.status === 'granted');
        })();
    }, [])

    if (hasPermisison === false) {
        return (
            <SafeAreaView>
                <Text>Camera permission is not granted</Text>
            </SafeAreaView>
        )
    }

    const takePicure = async () => {
        if (cameraRef) {
            try {
                const options = {
                    quality: 1,
                    base64: true,
                    exif: false,
                };
                const data = await cameraRef.current.takePictureAsync(options);
                setImageUri(data);
            } catch (e) {
                console.log(e);
            }
        }
    }
    const addFoodImage = () => {
        navigation.navigate({
            name: ADD_FOOD_ITEM_BY_FORM_SCREEN,
            params: { image: imageUri },
            merge: true,
        })
    }

    return (
        <View style={styles.container}>
            {
                imageUri ?
                <Image
                    source={{ uri: 'data:image/jpg;base64,' + imageUri.base64 }}
                    style={styles.camera}
                />
                :
                <Camera style={styles.camera} type={type} ref={cameraRef}/>
            }
            {
                imageUri ?
                <SafeAreaView>
                    <View style={styles.afterPictureGroup}>
                        <CameraButton title={"Re-take"} icon="retweet" onPress={() => {setImageUri(null)}} color={null}/>
                        <CameraButton title={"Save"} icon="check" onPress={addFoodImage} color={null}/>
                    </View> 
                </SafeAreaView>
                :
                <CameraButton title={'Take a picture'} icon="camera" onPress={takePicure} color={null} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000',
        paddingBottom: 30
    },
    camera: {
        flex: 1,
    },
    afterPictureGroup: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 80
    }
})