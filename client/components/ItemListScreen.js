import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image , SafeAreaView, TouchableOpacity, FlatList, Modal} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions } from "react-native";
import colors from '../assets/colors'; 
import { fetchUsers, updateID, updateMyProfile, updateMyItemsList } from '../redux/features/usersSlice'
import axios from '../navigation/axios';
import { Card } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import AddItemsScreen from './AddItemsScreen';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';

// const timeoutId = BackgroundTimer.setInterval(() => {
//     // const scheduledDate = moment()
//     // console.log({scheduledDate})
//     console.log('tac');
//     // async function checkExpiredItems() {
//     //     const request = 
//     //     await axios
//     //     .get('checkExpiryDates')
//     //     .then(({data}) => {
//     //         console.log({data})
//     //     }).catch(err=>console.log(err))

//     // }
//     // checkExpiredItems();
// // }, diffTime);
// }, 5000);

function ItemListScreen({ navigation, fetchUrl }) {
    const dispatch = useDispatch();
    const [itemlist, setItemlist] = useState([])
    const [isExpiredClicked, setisExpiredClicked] = useState(false)
    const [isAddClicked, setisAddClicked] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const users = useSelector(state => state.users)
    
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
    
    useEffect(() => {      
        fetchData();
        async function fetchUsersData() {
            const request = 
            await axios
            .get('listusers')
            .then(({data}) => {
                dispatch(fetchUsers(data))
            }).catch(err=>console.log(err))
    
        }
        fetchUsersData();

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
        // var now = moment()
        // const scheduledDate = moment().add(1,'d').set({hour:09,minute:0,second:0,millisecond:0})
        // const scheduledDate = moment()
        // console.log({scheduledDate})
        // const diffTime = scheduledDate.diff(moment())
        // console.log({diffTime})
        // const diffTime = 10000;
        // const timeoutId = 
        // BackgroundTimer.setInterval(() => {
        //     // const scheduledDate = moment()
        //     // console.log({scheduledDate})
        //     // console.log('tac');
        //     async function checkExpiredItems() {
        //         const request = 
        //         await axios
        //         .get('checkExpiryDates')
        //         .then(({data}) => {
        //             console.log("items due are : ", data)
        //         }).catch(err=>console.log(err))
        
        //     }
        //     checkExpiredItems();
        // // }, diffTime);
        // }, 10000);

        
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
                    {itemlist.length == 0 ? 
                    <View style={styles.noItemsContainer}><Text style={styles.noItemsText} >No items found!</Text></View> :
                    <FlatList
                    keyExtractor={item => item.id.toString()}
                    data={itemlist}
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
                                            
                                        >
                                            <Icon
                                                    name='trash'
                                                    type='font-awesome'
                                                    color={ isExpiredClicked? colors.silver : colors.black }
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
                            onPress={() => handleIsExpired()}
                        >
                            <Icon
                                    name='history'
                                    type='font-awesome'
                                    color={ colors.black }
                                    size={35}

                                    />

                        </TouchableOpacity>
                            
                        <Text style={{ color: colors.darkgray}}>Expired</Text>
                    </View>  

                    <View style={{ flexDirection: 'column'}}>
                        <TouchableOpacity
                            // style= { isExpiredClicked ? styles.expiredIconLiked : styles.interactionContainer } 
                            onPress={
                                () => handleIsAdd()
            
                            }

                        >
                            <Icon
                                name='plus-circle'
                                type='font-awesome'
                                color={ isAddClicked ? colors.silver : colors.black }
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
        // flex: 1
        // alignItems: 'center'
            
    },
    modalContainer: {
        display: 'flex',
        // flexDirection: 'column',
        paddingTop: 50,
        backgroundColor: colors.wildsand,
        padding: 20,
        // flex:1,
        // height: Dimensions.get('window').height-110,
        borderRadius: 40,
        marginTop: 100,
        margin: 10
        // justifyContent: 'center',
        // flex: 1
        // alignItems: 'center'
    },
    cross: {
        // flex: 1
        // justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10
    },
    form: {
        // flex: 1
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
        // flex: 1,
        
    },
    btn: {
        backgroundColor: colors.bloodred,
        width: '100%',
        // alignSelf: 'stretch',
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