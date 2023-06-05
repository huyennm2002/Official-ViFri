import { View, StyleSheet, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FAB } from '@rneui/themed';
import FridgeItem from '../../components/FridgeItem';
import { faBarcode } from '@fortawesome/free-solid-svg-icons/faBarcode';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function FridgeItemListScreen() {
    const fridgeList = [{
        id: 1
    }];

    const [isSubFabOpen, setSubFabOpen] = useState(false);

    const toggleSubFab = () => {
        setSubFabOpen(!isSubFabOpen);
    }

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <Header/>
            <ScrollView style={styles.container}>
                {fridgeList.map(item => <FridgeItem key={item.id} />)}
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