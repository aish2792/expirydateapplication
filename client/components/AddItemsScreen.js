import React from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView} from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { updateExistingMyItemsList  } from '../redux/features/usersSlice'
import colors from '../assets/colors'; 
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from '../navigation/axios';


const today = new Date();
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
      .min(today.toLocaleDateString("en-US"))
      .label('Expiry Date')
      .required("Expiry Date is a required field"),

    price: yup
      .number()
      .label('Price')
    
})


/** Handles Add Items modal and adds the items to Items List screen. Items 
 * are added to the database via API calls using AXIOS */

const AddItemsScreen = ({ navigation }) =>{
    const dispatch = useDispatch();

    // Async call to API to insert the items
    async function insertItemsData(values) {
        const request = await axios
        .post('insertItems', {values})
        .then((data) => {            
            const currentItem = data['data']
            dispatch(updateExistingMyItemsList(currentItem)) // update myItems in the state
    
        })
    }

    return (
        <SafeAreaView>
             <View style={styles.container}>
                <View>
                    <Formik
                        initialValues={{ itemName: '', itemType: '',expiryDate: '', price: ''}}  
                        validationSchema={ReviewSignUpSchema}
                        onSubmit={(values, actions) => {
                            actions.resetForm();
                            insertItemsData(values)
                            
                        }}  
                    >
                        {(formikprops) => (
                            <View>

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
                                    placeholder='Expiry Date (MM/DD/YY)'
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
        flexDirection: 'column',
            
    },

    btnStyle: {
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center'  
    },

    btn: {
        backgroundColor: colors.bloodred,
        width: '100%',
        borderRadius: 100
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