import React, { useEffect, useState }  from 'react';
import { StyleSheet, Text, TextInput, View, Image , SafeAreaView, TouchableOpacity} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/usersSlice'
import { Dimensions } from "react-native";
import colors from '../assets/colors'; 
import axios from '../navigation/axios';


function SettingsScreen({ navigation }) {
    const dispatch = useDispatch();

    async function logOut() {
        const request = await axios
        .post('logout')
        .then(({data}) => {
            // console.log({data})
            dispatch(logout())
            

        })

    }

    async function deleteAccount() {
        const request = await axios
        .post('deleteAccount')
        .then(({data}) => {
            // console.log({data})
            dispatch(logout())
            

        })

    }
    const handleLogOut = () => {
        logOut()
        navigation.navigate('Login') 
        }
    
    const handleDeleteAccount = () => {
        deleteAccount()
        navigation.navigate('Login') 
    }


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.textStyle}>Expiry date tracker helps you stay on check with the items in your household. It will remind you when the expiry date is due in 3 days. Stay Safe and Take Care!</Text> 
            
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
    
        // flex: 1
        // alignItems: 'center'
            
    },
    textStyle: {
        fontSize: 17,
        color: colors.mandy,
        // fontWeight: 'bold',
        
        
    },
    btnStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
        
        // padding: 20
        // flex: 1,
        
    },
    btn: {
        backgroundColor: colors.bloodred,
        width: '100%',
        // alignSelf: 'stretch',
        borderRadius: 100,
        marginBottom: 10
        // flex:1
        
    },


})

export default SettingsScreen