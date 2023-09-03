import { View, Text, Modal, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { ModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function AddOptionsDropDown({ visible, options, onSelectOption, onClose }) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <Pressable style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0)'}} onPress={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.dropDownContainer}>
          {options.map((option, index) => (
            <Pressable key={index} onPress={() => onSelectOption(option)}>
              <View style={styles.optionButton}>
                <FontAwesomeIcon style={{marginRight: 10}} icon={option.icon}/>
                <Text style={{ color: 'black', fontSize: 16 }}>{option.text}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  dropDownContainer: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
    position: 'absolute',
    top: 100, // Adjust this value to position the dropdown correctly
    right: 58,
    zIndex: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
  },
  optionButton: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
  }
});