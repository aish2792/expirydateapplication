import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Image , ScrollView} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from '../components/HomeScreen';
import SignUpScreen from '../components/SignUpScreen';
import LoginScreen from '../components/LoginScreen';

const Stack = createStackNavigator();

const UserFlow = () => {
    return (
        // <Text>Hey userflow</Text>
        <Stack.Navigator>
            <Stack.Screen name="Register" component={SignUpScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    )
};

export default UserFlow