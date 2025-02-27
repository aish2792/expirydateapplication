import React, { useEffect, useState }  from 'react';
import { StyleSheet, Text, TextInput, View , SafeAreaView, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/features/usersSlice'
import { Dimensions } from "react-native";
import colors from '../assets/colors'; 
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from '../navigation/axios';


// yup schema for validation
const ReviewSignUpSchema = yup.object({
    email: yup
      .string()
      .min(1, "Must be at least 1 character")
      .label('Email')
      .email()
      .required("Email is a required field"),
    password: yup
      .string()
    //   .password()
      .min(6, "Must be at least 6 characters")
      .label('Password')
      .required("Password is a required field")
})

/** Handles Login screen and and the necessary validations.  */
function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    const [message, setMessage] = useState([])
    const [validUser, setValidUser] = useState(false)

    // Async call to API to check if the user exists and validate the password.
    async function checkLogin(values) {
        const request = await axios
        .post('checklogin', {values})
        .then(({data}) => {
            setMessage(data)
            if (data['message'] === 'Success') {
                setValidUser(true)
                navigation.navigate('ItemList')
            }
            else {
                setValidUser(false)
            }  
        }).catch(err=>console.log(err))
    }


    useEffect(() => {
        // Async call to API to fetch the list of all the users
        async function fetchUsersData() {    
            const request = 
            await axios
            .get('listusers')
            .then(({data}) => {
                dispatch(fetchUsers(data))
            }).catch(err=>console.log(err))
        }
        fetchUsersData();  
      }, ['listusers']); 
      
    const msg = message['message']

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.fontStyle} >unXpired</Text>
                </View>
                <View>
                    <Formik
                        initialValues={{ email: '', password: ''}}  
                        validationSchema={ReviewSignUpSchema}
                        onSubmit={(values, actions) => {
                            actions.resetForm();
                            checkLogin(values)
                        }}  
                    >
                        {(formikprops) => (
                            <View style={styles.formikContainer}>
                                {
                                    msg==='Password does not match' || msg==='failure' ? <Text style={styles.errorText}>{msg}</Text> : <Text></Text>       
                                }
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
                                    textContentType = "password"
                                    secureTextEntry={true}
                                    onChangeText={formikprops.handleChange('password')}
                                    value={formikprops.values.password}
                                    onBlur={formikprops.handleBlur('email')}
                                ></TextInput>
                                <Text style={styles.errorText}>{formikprops.touched.password && formikprops.errors.password}</Text>
                                <View style={styles.btnStyle}>
                                    <Button
                                    title='Log in'
                                    buttonStyle={styles.btn}
                                    onPress={formikprops.handleSubmit}
                                    />
                                </View>
    
                            </View>
                        )}
                    </Formik>   
                </View> 
                <View style={styles.footNote}> 
                   <Text style={styles.textNote}>New user?</Text> 
                    <TouchableOpacity
                        onPress={() => {
                            console.log("clicked!")
                            navigation.navigate('Register');
                          }}
                    > 
                        <Text> Sign up!</Text>
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
        padding: 10,
        backgroundColor: '#ffffff',
        height: Dimensions.get('window').height-110,
        borderRadius: 40,
        margin: 10,
        justifyContent: 'center',
            
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    formikContainer: {
        paddingTop: 50
    },

    btnStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
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
        
    },
    footNote: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10
        
    },
    textNote: {
        color: colors.silver
    },
    
})

export default LoginScreen