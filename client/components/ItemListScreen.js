import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image , SafeAreaView, TouchableOpacity, FlatList} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { updateIDs, updateCredentials } from '../redux/features/usersSlice'
import { Dimensions } from "react-native";
import colors from '../assets/colors'; 
import axios from '../navigation/axios';
import { Card } from 'react-native-paper';




function ItemListScreen({ navigation, fetchUrl }) {
    const dispatch = useDispatch();
    const [itemlist, setItemlist] = useState([])

    useEffect(() => {
        
        async function fetchData() {
            const request = await axios
            .get('itemsList/1')
            .then(({data}) => {
                console.log(data)
                setItemlist(data)
            })

        }
        fetchData();
        
      }, []); 
    
    return (
        <SafeAreaView>
            <View style={styles.container}>
            <View style={styles.btnStyle}>
                                    <Button
                                    title='Add item'
                                    buttonStyle={styles.btn}                                  
                                    onPress={() => navigation.navigate('AddItems')}
                                    />
                                </View>
                <View style={styles.cardContainer}>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={itemlist}
                        renderItem={({item}) => {
                        return (
                            <Card style={styles.card}>
                                <View style={styles.innerContainer}>
                                    <Text style={styles.textStyle}>{item.name}</Text>
                                    <Text style={styles.textStyle}>{item.expirationDate}</Text>
                                </View>
                            </Card>
                                
                            )
                        }}
                        

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
        padding: 10,
        backgroundColor: '#ffffff',
        height: Dimensions.get('window').height-110,
        borderRadius: 40,
        margin: 10,
        justifyContent: 'center',
        // flex: 1
        // alignItems: 'center'
            
    },
    cardContainer: {
        flex: 1,
        padding: 5
    },
    card: {
        margin: 5,
        backgroundColor: '#FFCCCB',
        borderRadius: 100
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft: 20
    },
    textStyle: {
        flex: 1,
        // fontSize: 15
    },
    btnStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        
        padding: 20
        // flex: 1,
        
    },
    btn: {
        backgroundColor: colors.bloodred,
        width: '100%',
        // alignSelf: 'stretch',
        borderRadius: 100
        
    }
})

export default ItemListScreen