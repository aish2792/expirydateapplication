import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from '../components/HomeScreen';
import LoginScreen from '../components/LoginScreen';
import SignUpScreen from '../components/SignUpScreen';
import ProfileScreen from '../components/ProfileScreen';
import ItemListScreen from '../components/ItemListScreen';
import AddItemsScreen from '../components/AddItemsScreen';
import SettingsScreen from '../components/SettingsScreen';


const Stack = createStackNavigator();

const UserFlow = () => {
    return (
        // <Text>Hey userflow</Text>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Register" component={SignUpScreen} />
            <Stack.Screen name="ItemList" component={ItemListScreen} options={{ headerLeft: null }}/>
            <Stack.Screen name="AddItems" component={AddItemsScreen}/>
            <Stack.Screen name="Settings" component={SettingsScreen}/>
            
        </Stack.Navigator>
    )
};

export default UserFlow