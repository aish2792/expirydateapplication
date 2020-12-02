import React from 'react';
import { StyleSheet, Text, TextInput, View, Image , SafeAreaView, TouchableOpacity} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from 'react-redux';


const ProfileScreen = ({ navigation }) =>{
    const dispatch = useDispatch();

    
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
        flex: 2,
        flexDirection: 'column',
        padding: 2,
        backgroundColor: '#555555',
        height: Dimensions.get('window').height-110,
        borderRadius: 40,
        margin: 10,
        justifyContent: 'center',
        // alignItems: 'center'
            
    },
    btmcontainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#555555',
        flexDirection: 'column',

    }
    
})

export default ProfileScreen