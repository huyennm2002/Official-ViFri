import { View, Text, Modal, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { ModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AddOptionsDropDown({ visible, options, onSelectOption, onClose }) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      {/* <TouchableWithoutFeedback onPress={onClose}> */}
        <View style={styles.modalBackdrop}>
          <View style={styles.dropDownContainer}>
            {/* <TouchableWithoutFeedback> */}
              {options.map((option, index) => (
                <Pressable key={index} onPress={() => onSelectOption(option)}>
                  <View style={styles.optionButton}>
                    <Text style={{color: '#FFFFFF'}}>{option}</Text>
                  </View>
                </Pressable>
              ))}
            {/* </TouchableWithoutFeedback> */}
          </View>
        </View>
      {/* </TouchableWithoutFeedback> */}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)', // Semi-transparent background
  },
  dropDownContainer: {
    backgroundColor: '#B4B4B4',
    elevation: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#848484',
    padding: 5,
    position: 'absolute',
    top: 100, // Adjust this value to position the dropdown correctly
    right: 70,
    zIndex: 10,
  },
  optionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});