import React, { useEffect, useState }  from 'react';
import { StyleSheet, Text, TextInput, View, Image , SafeAreaView, TouchableOpacity} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/usersSlice'
import { Dimensions } from "react-native";
import colors from '../assets/colors'; 
import axios from '../navigation/axios';


/** Handles the Setting screen where users can log out or delete the account */
function SettingsScreen({ navigation }) {
    const dispatch = useDispatch();

    // Async call to API to remove the user from the current session.
    async function logOut() {
        const request = await axios
        .post('logout')
        .then(({data}) => {
            dispatch(logout())
        })

    }

    // Async call to API to remove the user from the database and the data corresponding to the user.
    async function deleteAccount() {
        const request = await axios
        .post('deleteAccount')
        .then(({data}) => {
            dispatch(logout())
        })
    }

    // Function to handle log out when users clicks on Log Out button
    const handleLogOut = () => {
        logOut()
        navigation.navigate('Login') 
        }
    
    // Function to handle delete account when user clicks on Delete Account button
    const handleDeleteAccount = () => {
        deleteAccount()
        navigation.navigate('Login') 
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.textStyle}>Expiry date tracker helps you stay on check with the items in your household. It will give you an alert a day before item(s)'s expiry date. Stay Safe and Take Care!</Text> 
            
            <View style={styles.btnStyle}>
                <Button
                        title='Log Out'
                        buttonStyle={styles.btn}
                        onPress={() => handleLogOut()}     
                    /> 
             
                <Button
                    title='Delete Account'
                    buttonStyle={styles.btn}
                    onPress={() => handleDeleteAccount()}                 
                /> 

            </View>  
           </View>
        </SafeAreaView>
        
        
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 50,
        backgroundColor: '#ffffff',
        height: Dimensions.get('window').height-110,
        borderRadius: 40,
        margin: 10,
        justifyContent: 'flex-start',
          
    },
    textStyle: {
        fontSize: 17,
        color: colors.mandy    
    },

    btnStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
        
    },

    btn: {
        backgroundColor: colors.bloodred,
        width: '100%',
        borderRadius: 100,
        marginBottom: 10
        
    },


})

export default SettingsScreen