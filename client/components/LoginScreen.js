import React from 'react';
import { StyleSheet, Text, TextInput, View, Image , SafeAreaView, TouchableOpacity} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { updateIDs, updateCredentials } from '../redux/features/usersSlice'
import { Dimensions } from "react-native";
import colors from '../assets/colors'; 
import { Formik } from 'formik';
import * as yup from 'yup';


const ReviewSignUpSchema = yup.object({
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


// function setIDOf (dispatch) {
//     dispatch(updateIDs('1234'))
    
// }

function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    
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
                            dispatch(updateCredentials(values))
                             navigation.navigate('ItemList');
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
                                    onBlur={formikprops.handleBlur('email')}
                                ></TextInput>
                                <Text style={styles.errorText}>{formikprops.touched.email && formikprops.errors.email}</Text>
                                <TextInput 
                                    style={styles.inputBox}
                                    placeholder='Password'
                                    onChangeText={formikprops.handleChange('password')}
                                    value={formikprops.values.password}
                                    onBlur={formikprops.handleBlur('email')}
                                ></TextInput>
                                <Text style={styles.errorText}>{formikprops.touched.password && formikprops.errors.password}</Text>
                                <View style={styles.btnStyle}>
                                    <Button
                                    title='Log in'
                                    buttonStyle={styles.btn}
                                    // onPress={() => setIDOf(dispatch)}
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
        // flex: 1
        // alignItems: 'center'
            
    },
    titleContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 20

    },
    formikContainer: {
        // flex: 1,
        // justifyContent: 'flex-',
        // alignItems: 'flex-end'
        // padding: 20
    },

    btnStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        
        // padding: 20
        // flex: 1,
        
    },
    btn: {
        backgroundColor: colors.bloodred,
        width: '100%',
        // alignSelf: 'stretch',
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