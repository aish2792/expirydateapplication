import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image , SafeAreaView, TouchableOpacity, FlatList, Modal, Alert} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions } from "react-native";
import colors from '../assets/colors'; 
import { fetchUsers, updateID, updateMyProfile, updateMyItemsList, removeItem } from '../redux/features/usersSlice'
import axios from '../navigation/axios';
import { Card } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import AddItemsScreen from './AddItemsScreen';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';


/**  Handles the Items List screen. Updates the screen when users add or delete items. Displays expiry date
 * of the items along with the name and type */
function ItemListScreen({ navigation }) {
    const dispatch = useDispatch();
    const [itemlist, setItemlist] = useState([])
    const [isExpiredClicked, setisExpiredClicked] = useState(false)
    const [isAddClicked, setisAddClicked] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [dueItems, setDueItems] = useState([])
    const users = useSelector(state => state.users)

    const allitems = users['myItems']

    // Async call to API to fetch the list of the items of the current user
    async function fetchData() {
        const request = await axios
        .get('itemsList')
        .then(({data}) => {
            setItemlist(data)
            dispatch(updateMyItemsList(data))
        })

    }

    const handleIsExpired = () => {
        setisExpiredClicked(!isExpiredClicked) 
        }

    const handleIsAdd = () => { 
        setisAddClicked(!isAddClicked) 
        setModalOpen(true)
        }

    const handleDone = () => {
        setModalOpen(false)
        fetchData()
    
            
        }

    // Function that alerts the users with the names of items, a day before the due date.
    const handleAlert = (data) => {  
        let alertString = 'Item(s) listed below are about to expire tomorrow: ' + "\n" + [data]
        Alert.alert(
            'Attention',
            alertString,
            [
                {text: 'OK', onPress: () => console.log('Ok Pressed!')},
            ],
            { cancelable: false }
            )
            
        }
    
    const handleNoItemsAlert = () => {  
        let alertString = 'There are no items about to expire tomorrow!' 
        Alert.alert(
            'Attention',
            alertString,
            [
                {text: 'OK', onPress: () => console.log('Ok Pressed!')},
            ],
            { cancelable: false }
            )
            
        }
    
    const handleDelete = (itemid) => {
        // Async call to API to remove the items from the list when the user deletes an item.
        async function removeItemFromList() {
            const request = await axios
            .post('removeItemFromMyList', {itemid})
            .then(({data}) => {
                dispatch(removeItem(itemid))     
            }).catch(err=>console.log(err))
        }
        removeItemFromList();
        fetchData()
    }


    useEffect(() => {      
        fetchData();
        // Async call to API to load all the users' details
        async function fetchUsersData() {
            const request = 
            await axios
            .get('listusers')
            .then(({data}) => {
                dispatch(fetchUsers(data))
            }).catch(err=>console.log(err))
    
        }
        fetchUsersData();

        // Async call to API to load the current user's details
        async function fetchCurrentUsersData() {
            const request = 
            await axios
            .get('fetchuser')
            .then(({data}) => {
                dispatch(updateMyProfile(data[0]))
                dispatch(updateID(data[0]))
            }).catch(err=>console.log(err))
    
        }
        fetchCurrentUsersData();

        // Timer set to 9 AM every morning that will check if there are any items with expiry date due the very next day
        const scheduledDate = moment().add(1,'d').set({hour:9,minute:0,second:0,millisecond:0})
        const diffTime = scheduledDate.diff(moment())
        BackgroundTimer.setInterval(() => {

            // Async call to API to check if any items are due the next day
            async function checkExpiredItems() {
                const request = 
                await axios
                .get('checkExpiryDates')
                .then(({data}) => {
                    setDueItems(data)
                    // console.log(data['itemsDue'])s
                    if (Object.keys(data).length > 0) {
                        // console.log("length is : ", data['itemsDue'] )
                        handleAlert(data['itemsDue'])
                    }
                    else {
                        handleNoItemsAlert()
                    }
   
                }).catch(err=>console.log(err))
        
            }
            checkExpiredItems();
        }, diffTime); 
      }, []); 

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Modal visible={modalOpen} animationType='slide'>
                    <View style={styles.modalContainer}>
                        <View style={styles.cross}>
                            <TouchableOpacity
                                    onPress={
                                        () => setModalOpen(false)
                                    }
                                    >
                                    <Icon
                                        name='close'
                                        type='font-awesome'
                                        color={colors.black}
                                        size={35}
                                        style={{ }}
                                    />

                            </TouchableOpacity>

                        </View>
                        <View style={styles.form}>
                            <AddItemsScreen />
                        </View>
                        <Button
                            title='Done'
                            buttonStyle={styles.doneStyle}
                            onPress={() => handleDone()}
                            
                            />
     
                    </View>

                </Modal>

                
                <View style={styles.cardContainer}>
                    {allitems.length == 0 ? 
                    <View style={styles.noItemsContainer}><Text style={styles.noItemsText} >No items found!</Text></View> :
                    <FlatList
                    keyExtractor={item => item.id.toString()}
                    data={allitems}
                    renderItem={({item}) => {
                    return (
                        <Card style={styles.card}>
                            <View style={{ margin: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 2 }}>
                                        <View style={styles.innerContainer}>
                                                    <Text style={styles.textStyle}>{item.typeItem}</Text>
                                                    <Text style={styles.innerTextStyle}>{item.name}</Text>
                                               
                                        </View>
                                        <View style={styles.innerContainer}>
                                                <Text style={styles.textStyle}>Expiry Date</Text>
                                                <Text style={styles.innerTextStyle}>{item.expirationDate}</Text>
                                               
                                        </View>

                                    </View>
                                        
                                    <View style={{ flex: 0.5, justifyContent:"center", alignItems:'center' }}>
                                        <TouchableOpacity
                                            onPress = {() => handleDelete(item.id)}
                                            
                                        >
                                            <Icon
                                                    name='trash'
                                                    type='font-awesome'
                                                    color={ colors.black }
                                                    size={35}

                                            />

                                        </TouchableOpacity>
                                        
                                    </View>

                                </View>
                                </View>    
                        </Card>
                            
                        )
                    }}
                /> 
                }    
                </View> 
                <View style={styles.iconStyle}>
                    <View style={{ flexDirection: 'column'}}>
                        <TouchableOpacity
                            onPress={
                                () => handleIsAdd()
                            }
                        >
                            <Icon
                                name='plus-circle'
                                type='font-awesome'
                                color={ colors.black }
                                size={35}
                                />

                        </TouchableOpacity>
                        
                        <Text style={{ color: colors.darkgray}}>Add Items</Text>
                    </View>  
                        
                    <View style={{ flexDirection: 'column'}}>
                        <TouchableOpacity
                            onPress={() => (navigation.navigate('Settings'))}
                        >
                            <Icon
                                // name='power-off'
                                name='cogs'
                                type='font-awesome'
                                color={colors.black}
                                size={35}
                                />
                        </TouchableOpacity>
                        
                        <Text style={{ color: colors.darkgray}}>Settings</Text>
                    </View>  

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
    modalContainer: {
        display: 'flex',
        paddingTop: 50,
        backgroundColor: colors.wildsand,
        padding: 20,
        borderRadius: 40,
        marginTop: 100,
        margin: 10
    },
    cross: {
        alignItems: 'flex-end',
        padding: 10
    },
    form: {
        justifyContent: 'flex-start'
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
        flex: 2,
        flexDirection: 'row',
        padding: 10,
        marginLeft: 20
    },
    textStyle: {
        flex: 1,
        fontSize: 17
    },
    innerTextStyle: {
        flex: 1,
        fontSize: 17,
        marginHorizontal: 5
    },
    noItemsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    },
    noItemsText: {
        fontSize: 20,
        color: colors.mandy,
        fontWeight: 'bold',
        
        
    },
    doneStyle: {
        backgroundColor: colors.bloodred,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 55,
        width: '70%',

    },

    btnStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20
        
    },
    btn: {
        backgroundColor: colors.bloodred,
        width: '100%',
        borderRadius: 100
        
    },
    iconStyle: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.wildsand,
        borderRadius: 100
    }
})

export default ItemListScreen