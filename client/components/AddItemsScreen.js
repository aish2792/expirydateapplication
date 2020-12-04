import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image , SafeAreaView, TouchableOpacity, FlatList} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { updateIDs, updateCredentials } from '../redux/features/usersSlice'
import { Dimensions } from "react-native";
import colors from '../assets/colors'; 
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Card } from 'react-native-paper';



const ReviewSignUpSchema = yup.object({
    itemName: yup
      .string()
      .min(2, "Must be at least 2 characters")
      .max(30, "Must be at most 30 characters")
      .required("Item name is a required field"),
    
    itemType: yup
      .string()
      .min(2, "Must be at least 2 characters")
      .max(30, "Must be at most 30 characters")
      .required("Item type is a required field"),

    expiryDate: yup
      .date()
      .label('Expiry Date')
      .required("Expiry Date is a required field"),

    price: yup
      .number()
      .label('Price')
    
})
// function setIDOf (dispatch) {
//     dispatch(updateIDs('1234'))
    
// }



const AddItemsScreen = ({ navigation }) =>{
    const dispatch = useDispatch();
    // const {navigate} = navigation;
    
    return (
        <SafeAreaView>
             <View style={styles.container}>
                <View>
                    <Formik
                        initialValues={{ itemName: '', itemType: '',expiryDate: '', price: ''}}  
                        validationSchema={ReviewSignUpSchema}
                        onSubmit={(values, actions) => {
                            actions.resetForm();
                            // dispatch(updateMyProfile(values))
                           
                            console.log(values);

                        }}  
                    >
                        {(formikprops) => (
                            <View style={styles.formikContainer}>

                                <TextInput 
                                    style={styles.inputBox}
                                    placeholder='Item Name'
                                    onChangeText={formikprops.handleChange('itemName')}
                                    value={formikprops.values.itemName}
                                    onBlur={formikprops.handleBlur('itemName')}
                                ></TextInput>
                                <Text style={styles.errorText}>{formikprops.touched.itemName && formikprops.errors.itemName}</Text>

                                <TextInput 
                                    style={styles.inputBox}
                                    placeholder='Item Type'
                                    onChangeText={formikprops.handleChange('itemType')}
                                    value={formikprops.values.itemType}
                                    onBlur={formikprops.handleBlur('itemType')}
                                ></TextInput>
                                <Text style={styles.errorText}>{formikprops.touched.itemType && formikprops.errors.itemType}</Text>

                                <TextInput 
                                    style={styles.inputBox}
                                    placeholder='Expiry Date'
                                    onChangeText={formikprops.handleChange('expiryDate')}
                                    value={formikprops.values.expiryDate}
                                    onBlur={formikprops.handleBlur('expiryDate')}
                                ></TextInput>
                                <Text style={styles.errorText}>{formikprops.touched.expiryDate && formikprops.errors.expiryDate}</Text>

                                <TextInput 
                                    style={styles.inputBox}
                                    placeholder='Price'
                                    onChangeText={formikprops.handleChange('price')}
                                    value={formikprops.values.price}
                                    onBlur={formikprops.handleBlur('price')}
                                ></TextInput>
                                <Text style={styles.errorText}>{formikprops.touched.price && formikprops.errors.price}</Text>

                                <View style={styles.btnStyle}>
                                        <Button
                                        title='Add Item'
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

export default AddItemsScreen