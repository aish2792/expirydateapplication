import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image , SafeAreaView, TouchableOpacity} from 'react-native';
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import axios from '../navigation/axios';


const ProfileScreen = ({ route, navigation }) =>{
    const dispatch = useDispatch();
    const values = route.params

    useEffect(() => {
        
        async function postData() {
            const request = await axios
            .post('users', {values})
            .then((response) => {
                console.log(response)

            }
            )
            .catch(err=>err)

        }
        postData();
        
      }, []); 

    
    return (
        <SafeAreaView>
             <View style={styles.container}>
                 <Text>I am inside</Text>
            </View>   
            <View>
                <Text></Text>
                <Text></Text>
            </View> 
        </SafeAreaView>
  
    )
}

const styles = StyleSheet.create({
    
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#ffffff',
        height: Dimensions.get('window').height-110,
        borderRadius: 40,
        margin: 10,
        justifyContent: 'center',
        // flex: 1
        // alignItems: 'center'
            
    }
  
    
})

export default ProfileScreen