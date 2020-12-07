import React, { useEffect, useState }  from 'react';
import { StyleSheet, Text, TextInput, View, Image , SafeAreaView, TouchableOpacity} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, updateMyProfile, updateID } from '../redux/features/usersSlice'
import { Dimensions } from "react-native";
import colors from '../assets/colors'; 
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from '../navigation/axios';


const ReviewSignUpSchema = yup.object({
    firstname: yup
      .string()
      .min(2, "Must be at least 2 characters")
      .max(30, "Must be at most 30 characters")
      .required("First name is a required field"),
    
    lastname: yup
      .string()
      .min(2, "Must be at least 2 characters")
      .max(30, "Must be at most 30 characters")
      .required("Last name is a required field"),

    email: yup
      .string()
      .min(1, "Must be at least 1 character")
      .label('Email')
      .email()
      .required("Email is a required field"),

    password: yup
      .string()
      .min(6, "Must be at least 6 characters")
      .label('Password')
      .required("Password is a required field")
    
})

const SignUpScreen = ({ navigation }) =>{
    const dispatch = useDispatch();
    const [message, setMessage] = useState([])

    async function checkLogin(values) {
        const request = await axios
        .post('checksignup', {values})
        .then(({data}) => {
            if (data['message'] === 'User already exists!') {
                setMessage(data['message'])
            }
            else {
                dispatch(updateMyProfile(values))
                sendUsersData(values)
            }  
        }).catch(err=>console.log(err))
    }

    async function sendUsersData(values) {
        const request = 
        await axios
        .post('users', values)
        .then(({data}) => {
            dispatch(updateMyProfile(values))
            dispatch(updateID(data))

            navigation.navigate('ItemList')
        }).catch(err=>console.log(err))

    }
    
  
    
    useEffect(() => {
        
        async function fetchUsersData() {
            const request = 
            await axios
            .get('listusers')
            .then(({data}) => {
                dispatch(fetchUsers(data))
            }).catch(err=>console.log(err))

        }
        fetchUsersData();
        
      }, ['listusers', message]); 
    

    return (
        <SafeAreaView>
             <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.fontStyle} >unXpired</Text>
                </View>
                <View>
                    <Formik
                        initialValues={{ firstname: '', lastname: '',email: '', password: ''}}  
                        validationSchema={ReviewSignUpSchema}
                        onSubmit={(values, actions) => {
                            
                            checkLogin(values)
                            actions.resetForm();
                            
                            
                            
                           
                            // console.log({values});

                        }}  
                    >
                        {(formikprops) => (
                            <View style={styles.formikContainer}>
                                {
                                    message==='User already exists!' ? <Text style={styles.errorText}>{message}</Text> : <Text></Text>       
                                }

                                <TextInput 
                                    style={styles.inputBox}
                                    placeholder='First Name'
                                    onChangeText={formikprops.handleChange('firstname')}
                                    value={formikprops.values.firstname}
                                    onBlur={formikprops.handleBlur('firstname')}
                                ></TextInput>
                                <Text style={styles.errorText}>{formikprops.touched.firstname && formikprops.errors.firstname}</Text>

                                <TextInput 
                                    style={styles.inputBox}
                                    placeholder='Last Name'
                                    onChangeText={formikprops.handleChange('lastname')}
                                    value={formikprops.values.lastname}
                                    onBlur={formikprops.handleBlur('lastname')}
                                ></TextInput>
                                <Text style={styles.errorText}>{formikprops.touched.lastname && formikprops.errors.lastname}</Text>

                                <TextInput 
                                    style={styles.inputBox}
                                    placeholder='Email'
                                    onChangeText={formikprops.handleChange('email')}
                                    value={formikprops.values.email}
                                    onBlur={formikprops.handleBlur('email')}
                                ></TextInput>
                                <Text style={styles.errorText}>{formikprops.touched.email && formikprops.errors.email}</Text>

                                <TextInput 
                                    style={styles.inputBox}
                                    placeholder='Password'
                                    secureTextEntry={true}
                                    onChangeText={formikprops.handleChange('password')}
                                    value={formikprops.values.password}
                                    onBlur={formikprops.handleBlur('password')}
                                ></TextInput>
                                <Text style={styles.errorText}>{formikprops.touched.password && formikprops.errors.password}</Text>

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
        backgroundColor: colors.bloodred,
        width: '100%',
        borderRadius: 100
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
    
    errorText: {
        color: colors.bloodred,
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center'
        
    }

    
})

export default SignUpScreen