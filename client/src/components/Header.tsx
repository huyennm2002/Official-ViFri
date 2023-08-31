import { View, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Header as HeaderRNE } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ViFriLogo from './ViFriLogo';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AddOptionsDropDown from './AddOptionsDropDown';

export default function Header({closeModal}) {
    const navigation = useNavigation();
    const [isDropdownVisibile, setIsDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const addDropdownOptions = ['By Form', 'By Scan', 'Cancel'];

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisibile);
    }

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsDropdownVisible(false);
    }

    return (
        <View>
            <HeaderRNE
                backgroundColor='tomato'
                leftComponent={<ViFriLogo navigation={navigation} />}
                rightComponent={
                    <View style={styles.icons}>
                        <Pressable onPress={toggleDropdown} style={styles.firstIcon}>
                            <FontAwesomeIcon size={26} color='white' icon={faPlus} />
                        </Pressable>
                        <Pressable style={styles.firstIcon}>
                            <FontAwesomeIcon size={26} color='white' icon={faMagnifyingGlass} />
                        </Pressable>
                        <Pressable>
                            <FontAwesomeIcon size={26} color='white' icon={faBell} />
                        </Pressable>
                    </View>
                }
            />
            {isDropdownVisibile && (
                <AddOptionsDropDown
                    visible={isDropdownVisibile}
                    options={addDropdownOptions}
                    onSelectOption={handleOptionSelect}
                    onClose={() => setIsDropdownVisible(false)} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    icons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 26
    },
    firstIcon: {
        marginRight: 20
    }
})