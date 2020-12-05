import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import * as Sentry from '@sentry/react-native';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        id: null,
        isLoggedIn: false,
        email: '',
        password: '',
        myProfile: {},
        users: [],
        loading: false,
        error: null,
        items: []
    },
    reducers: {
        setId(state, action) {
			state.id = action.payload
        },
        setEmail(state, action) {
			state.email = action.payload
        },
        setPassword(state, action) {
			state.password = action.payload
        },
        setItems(state, action) {
			state.items = action.payload
        },
        setMyProfile(state, action) {
			state.myProfile = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setUsers(state, action) {
			state.users = action.payload
		}
    }
})

export const {
    setId,
    setItems,
    setEmail,
    setPassword,
    setMyProfile,
    setLoading,
    setUsers
} = usersSlice.actions


export default usersSlice.reducer



export const updateIDs = (userId) => async (
    dispatch,
    getState,
  ) => {
      dispatch(setLoading(true));
      dispatch(setId(userId))
      
  };

export const updateCredentials = (cred) => async (
    dispatch,
    getState,
    ) => {

        const {email, password} = cred
        dispatch(setEmail(email))
        dispatch(setPassword(password))
        
    };

export const updateMyProfile = (cred) => (
    dispatch,
    getState,
    ) => {
        const {firstname, lastname, email, password} = cred
        const profile = {
            'firstname': firstname,
            'lastname': lastname,
            'email': email,
        }

        dispatch(setMyProfile(profile)) //updates the state
  
    };

export const fetchUsers = (users) => async (
    dispatch,
    getState,
    ) => {

            let userslist = users
            // console.log("users are : ", users)
            // users.forEach(element => {
                
            // });
            dispatch(setUsers(users))
            

        
    };


  
  