import { View, StyleSheet, Dimensions, Pressable, Text } from 'react-native'
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FAB } from '@rneui/themed';
import FridgeItem from '../../components/FridgeItem';
import { faBarcode } from '@fortawesome/free-solid-svg-icons/faBarcode';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ADD_BY_FORM_NAVIGATION } from '../../constants/screenNames';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

export default function FridgeItemListScreen({navigation}) {
    const items = useSelector((state: RootState) => state.items.itemList);
    const [isSubFabOpen, setSubFabOpen] = useState(false);
    const toggleSubFab = () => {
        setSubFabOpen(!isSubFabOpen);
    }
    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <Header/>
            <ScrollView style={styles.container}>
            {
                items.length > 0 
                ? 
                (
                    items.map(item => <FridgeItem key={item.id.toString()} item={item} navigation={navigation} />)
                )
                :
                (
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>Your fridge is empty. Please add more items</Text>
                    </View>
                )
            }
            </ScrollView> 
            <View style={styles.fabContainer}>
                {isSubFabOpen && (
                    <View style={styles.subFabContainer}>
                        <Pressable>
                            <FAB
                                visible={true}
                                icon={<FontAwesomeIcon
                                    icon={faBarcode}
                                    color="white"
                                />}
                                color="crimson"
                                style={{ marginBottom: 8 }}
                                size="large"
                            />
                        </Pressable>
                        <Pressable>
                            <FAB
                                visible={true}
                                icon={{ name: 'post-add', color: 'white' }}
                                color="#E63B19"
                                style={styles.subFab}
                                size="large"
                                onPress={() => {navigation.navigate(ADD_BY_FORM_NAVIGATION)}}
                            />
                        </Pressable>
                        
                    </View>
                )}
                <FAB
                    visible={true}
                    icon={
                        { name: 'add', color: 'white' }
                    }
                    color="tomato"
                    onPress={toggleSubFab}
                    style={styles.fab}
                />
            </View>
        </SafeAreaProvider>
    )
}

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexGrow: 1
    },
    fabContainer: {
        position: 'absolute',
        bottom: screenHeight * 0.03,
        right: screenWidth * 0.05
    },
    subFabContainer: {
        flexDirection: 'column',
        marginBottom: 8
    },
    fab: {

    },
    subFab: {

    },
    header: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})