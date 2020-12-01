import React from 'react';
import { StyleSheet, Text, TextInput, View, Image , SafeAreaView} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { updateIDs } from '../redux/features/usersSlice'
import { Dimensions } from "react-native";
import colors from '../assets/colors'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Formik } from 'formik';

function setIDOf (dispatch) {
    dispatch(updateIDs('1234'))
    
}

const SignUpScreen = ({ navigation }) =>{
    const dispatch = useDispatch();
    // const {navigate} = navigation;
    
    return (
        <SafeAreaView>
             <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.fontStyle} >unXpired</Text>
                </View>
                <View>
                    <Formik
                        initialValues={{ email: '', password: ''}}  
                        onSubmit={(values) => {
                            console.log(values);
                        }}  
                    >
                        {(formikprops) => (
                            <View style={styles.formikContainer}>
                                <TextInput 
                                    style={styles.inputBox}
                                    placeholder='Email'
                                    onChangeText={formikprops.handleChange('email')}
                                    value={formikprops.values.email}
                                ></TextInput>
                                <TextInput 
                                    style={styles.inputBox}
                                    placeholder='Password'
                                    onChangeText={formikprops.handleChange('password')}
                                    value={formikprops.values.password}
                                ></TextInput>
                                <View style={styles.btnStyle}>
                                        <Button
                                        title='Sign up'
                                        buttonStyle={styles.btn}
                                        onPress={formikprops.handleSubmit}
                                        />
                                </View>   
                            </View>
                            
                        )}
                    </Formik>  
                     
                </View>  
                <View style={styles.footNote}> 
                   <Text >Already have an account?</Text> 
                    <TouchableOpacity
                        onPress={() => {
                            console.log("clicked!")
                            navigation.navigate('Login');
                          }}
                    > 
                        <Text > Sign in!</Text>
                    </TouchableOpacity>
                </View> 
                 
            </View>    
        </SafeAreaView>
  
    )
}

const styles = StyleSheet.create({
    
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        backgroundColor: '#ffffff',
        height: Dimensions.get('window').height-110,
        borderRadius: 40,
        margin: 10,
        justifyContent: 'center',
        // alignItems: 'center'
            
    },
    titleContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20

    },
    formikContainer: {
        // flex: 1,
        // justifyContent: 'flex-',
        // alignItems: 'flex-end'
        padding: 20
    },

    btnStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        padding: 20
        // flex: 1,
        
    },
    btn: {
        backgroundColor: colors.bloodred
    },
    fontStyle: {
        fontSize: 60,
        color: colors.bloodred
        
    },
    inputBox: {
        borderColor: colors.silver,
        margin: 10,
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    footNote: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10
        
    },
    textNote: {
        color: colors.darkgray
    },

    
})

export default SignUpScreen