import React from "react";
import { useSelector } from 'react-redux';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    SignUpScreen,
    SignInScreen,
    ProfileScreen,
    HomeScreen,
    FridgeItemListScreen,
    ShhowFridgeItemDetailScreen,
    AddFoodItemByFormScreen,
    RecipeListScreen
} from '../screens';
import {
    FRIDGE_ITEM_LIST_SCREEN,
    SHOW_FRIDGE_ITEM_DETAIL_SCREEN,
    ADD_FOOD_ITEM_BY_FORM_SCREEN,
    HOME_SCREEN,
    FRIDGE_ACTION_NAVIGATION,
    RECIPES_ACTION_NAVIGATION,
    PROFILE_SCREEN,
    SIGNIN_SCREEN,
    SIGNUP_SCREEN,
    AUTHENTICATION_NAVIGATION,
    MAIN_BOTTOM_TAB_NAVIGATION
} from '../constants/screenNames';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootState } from "../redux/store";


const AppNavigationStack = createStackNavigator();
const MainBottomTabBar = createBottomTabNavigator();
const AuthenticationStack = createStackNavigator();
const FridgeActionStack = createStackNavigator();

const FridgeActionNavigation = () => {
    return (
        <FridgeActionStack.Navigator screenOptions={{headerShown:false}}>
            <FridgeActionStack.Screen name={FRIDGE_ITEM_LIST_SCREEN} component={FridgeItemListScreen}/>
            <FridgeActionStack.Screen name={SHOW_FRIDGE_ITEM_DETAIL_SCREEN} component={ShhowFridgeItemDetailScreen}/>
            <FridgeActionStack.Screen name={ADD_FOOD_ITEM_BY_FORM_SCREEN} component={AddFoodItemByFormScreen}/>
        </FridgeActionStack.Navigator>
    )
}

const MainBottomTabNavigation = () => {
    return (
        <MainBottomTabBar.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === HOME_SCREEN) {
                        iconName = 'home-outline';
                    } else if (route.name === FRIDGE_ACTION_NAVIGATION) {
                        iconName = 'fast-food-outline';
                    } else if (route.name === RECIPES_ACTION_NAVIGATION) {
                        iconName = 'book-outline';
                    } else if (route.name === PROFILE_SCREEN) {
                        iconName = 'person-outline';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                headerShown: false, // Hides the header for all screens in the tab bar
                tabBarActiveTintColor: 'tomato', // Sets the active tab icon color
                tabBarInactiveTintColor: 'gray', // Sets the inactive tab icon color
            })}>
            <MainBottomTabBar.Screen name={HOME_SCREEN} component={HomeScreen} />
            <MainBottomTabBar.Screen name={FRIDGE_ACTION_NAVIGATION} component={FridgeActionNavigation} />
            <MainBottomTabBar.Screen name={RECIPES_ACTION_NAVIGATION} component={RecipeListScreen} />
            <MainBottomTabBar.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
        </MainBottomTabBar.Navigator>
    )
}

const AuthenticationNavigation = () => {
    return (
        <AuthenticationStack.Navigator screenOptions={{headerShown:false}}>
            <AuthenticationStack.Screen name={SIGNIN_SCREEN} component={SignInScreen} />
            <AuthenticationStack.Screen name={SIGNUP_SCREEN} component={SignUpScreen} />
        </AuthenticationStack.Navigator>
    )
}

const AppNavigation = () => {
    const loggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    return (
        <AppNavigationStack.Navigator screenOptions={{ gestureEnabled: false, headerShown:false }}>
            {
                loggedIn ?
                <AppNavigationStack.Screen name={MAIN_BOTTOM_TAB_NAVIGATION} component={MainBottomTabNavigation} options={{ headerShown: false }} />
                : <AppNavigationStack.Screen name={AUTHENTICATION_NAVIGATION} component={AuthenticationNavigation} options={{ headerShown: false }}></AppNavigationStack.Screen>
            }
        </AppNavigationStack.Navigator>
    )
}

export default AppNavigation;