import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import CameraButton from '../../components/CameraButton'
import { ADD_FOOD_ITEM_BY_FORM_SCREEN } from '../../constants/screenNames'

export default function CameraScreen({navigation}) {
    const [type, setType] = useState(CameraType.back);
    const cameraRef = useRef(null);
    const [hasPermisison, setHasPermission] = useState(null);
    const [imageUri, setImageUri] = useState(null);

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
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImageUri(data.uri);
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef}/>
            {
                imageUri ?
                <View style={styles.afterPictureGroup}>
                    <CameraButton title={"Re-take"} icon="retweet" onPress={() => {setImageUri(null)}} color={null}/>
                    <CameraButton title={"Save"} icon="check" onPress={() => {navigation.navigate(ADD_FOOD_ITEM_BY_FORM_SCREEN)}} color={null}/>
                </View> 
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