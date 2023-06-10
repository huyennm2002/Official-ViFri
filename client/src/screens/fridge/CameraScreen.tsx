import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { TouchableOpacity } from 'react-native-gesture-handler'


export default function CameraScreen() {
  return (
    <View>
      <Camera>
        <View>
            <TouchableOpacity>
                <Text>Flip Camera</Text>
            </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )
}