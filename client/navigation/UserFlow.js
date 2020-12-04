import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Image , ScrollView} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from '../components/HomeScreen';
import LoginScreen from '../components/LoginScreen';
import SignUpScreen from '../components/SignUpScreen';
import ProfileScreen from '../components/ProfileScreen';
import ItemListScreen from '../components/ItemListScreen';
import AddItemsScreen from '../components/AddItemsScreen';


const Stack = createStackNavigator();

const UserFlow = () => {
    return (
        // <Text>Hey userflow</Text>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Register" component={SignUpScreen} />
            <Stack.Screen name="ItemList" component={ItemListScreen} />
            <Stack.Screen name="AddItems" component={AddItemsScreen}/>
            
        </Stack.Navigator>
    )
};

export default UserFlow