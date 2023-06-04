import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    SignUpScreen,
    SignInScreen,
    ProfileScreen,
    HomeScreen,
    FridgeItemListScreen,
    RecipeListScreen
} from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';

const AppNavigationStack = createStackNavigator();
const MainBottomTabBar = createBottomTabNavigator();

const MainBottomTabNavigation = () => {
    return (
        <MainBottomTabBar.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Fridge') {
                        iconName = 'fast-food-outline';
                    } else if (route.name === 'Recipes') {
                        iconName = 'book-outline';
                    } else if (route.name === 'Profile') {
                        iconName = 'person-outline';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                headerShown: false, // Hides the header for all screens in the tab bar
                tabBarActiveTintColor: 'tomato', // Sets the active tab icon color
                tabBarInactiveTintColor: 'gray', // Sets the inactive tab icon color
            })}>
            <MainBottomTabBar.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <MainBottomTabBar.Screen name="Fridge" component={FridgeItemListScreen} options={{ headerShown: false }} />
            <MainBottomTabBar.Screen name="Recipes" component={RecipeListScreen} options={{ headerShown: false }} />
            <MainBottomTabBar.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        </MainBottomTabBar.Navigator>
    )
}

const AppNavigation = () => {
    return (
        <AppNavigationStack.Navigator screenOptions={{ gestureEnabled: false }}>
            <AppNavigationStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
            <AppNavigationStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            <AppNavigationStack.Screen name="Main" component={MainBottomTabNavigation} options={{ headerShown: false }} />
        </AppNavigationStack.Navigator>
    )
}

export default AppNavigation;