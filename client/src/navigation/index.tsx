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

const AppNavigationStack = createStackNavigator();
const MainBottomTabBar = createBottomTabNavigator();

const MainBottomTabNavigation = () => {
    return (
        <MainBottomTabBar.Navigator>
            <MainBottomTabBar.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <MainBottomTabBar.Screen name="Fridge" component={FridgeItemListScreen} options={{headerShown: false}}/>
            <MainBottomTabBar.Screen name="Recipes" component={RecipeListScreen} options={{headerShown: false}}/>
            <MainBottomTabBar.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
        </MainBottomTabBar.Navigator>
    )
}

const AppNavigation = () => {
    return (
        <AppNavigationStack.Navigator screenOptions={{gestureEnabled: false}}>
            <AppNavigationStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/>
            <AppNavigationStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
            <AppNavigationStack.Screen name="Main" component={MainBottomTabNavigation} options={{ headerShown: false }}/>
        </AppNavigationStack.Navigator>
    )
}

export default AppNavigation;