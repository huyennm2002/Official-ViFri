import { View, StyleSheet, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Header as HeaderRNE } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ViFriLogo from './ViFriLogo';
import AddOptionsDropDown from './AddOptionsDropDown';
import { ADD_BY_FORM_NAVIGATION } from '../constants/screenNames';
import { SEARCH_SCREEN } from '../constants/screenNames';

export default function Header({navigation}) {
    // const navigation = useNavigation();
    const [isDropdownVisibile, setIsDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const addDropdownOptions = [
        {
            icon: faPenToSquare,
            text: 'By Form'
        }
        ,
        {
            icon: faCamera,
            text: 'By Scan'
        }];

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisibile);
    }

    const handleOptionSelect = (option) => {
        setIsDropdownVisible(false);
        if (option.text === "By Form") {
            navigation.navigate(ADD_BY_FORM_NAVIGATION);
        } else if (option.text === "By Scan") {

        }
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
                        <Pressable onPress={() => navigation.navigate(SEARCH_SCREEN)} style={styles.firstIcon}>
                            <FontAwesomeIcon size={26} color='white' icon={faMagnifyingGlass} />
                        </Pressable>
                        <Pressable>
                            <FontAwesomeIcon size={26} color='white' icon={faBell} />
                        </Pressable>
                    </View>
                }
            />
            <AddOptionsDropDown
                visible={isDropdownVisibile}
                options={addDropdownOptions}
                onSelectOption={handleOptionSelect}
                onClose={() => setIsDropdownVisible(false)} />
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
    },
    modalContainer: {
        flex: 1
    },
    modalView: {
        margin: 50,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: 'red'
    }
})