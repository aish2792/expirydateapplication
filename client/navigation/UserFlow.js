import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/LoginScreen';
import SignUpScreen from '../components/SignUpScreen';
import ItemListScreen from '../components/ItemListScreen';
import AddItemsScreen from '../components/AddItemsScreen';
import SettingsScreen from '../components/SettingsScreen';


const Stack = createStackNavigator();

const UserFlow = () => {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
            <Stack.Screen name="Register" component={SignUpScreen} />
            <Stack.Screen name="ItemList" component={ItemListScreen} options={{ headerLeft: null, title: 'Items List' }}/>
            <Stack.Screen name="AddItems" component={AddItemsScreen} options={{ title: 'Add Item' }}/>
            <Stack.Screen name="Settings" component={SettingsScreen}/>    
        </Stack.Navigator>
    )
};

export default UserFlow