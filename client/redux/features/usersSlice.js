import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
    }
})

export const {
    setId,
    setItems,
    setEmail,
    setPassword,
    setMyProfile,
    setLoading
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
        // dispatch(setLoading(true));
        // dispatch(setEmail(emailId))
        
        const {email, password} = cred
        // console.log(email)
        // console.log(password)
        dispatch(setEmail(email))
        dispatch(setPassword(password))
        
    };

export const updateMyProfile = (cred) => (
    dispatch,
    getState,
    ) => {
        // console.log(cred)
        const {firstname, lastname, email, password} = cred
        // console.log(email)
        // console.log(password)
        const profile = {
            'firstname': firstname,
            'lastname': lastname,
            'email': email,
            'password':password
        }

        console.log({profile})

        // const profile_json = JSON.stringify(profile)  
        // console.log("profile : ", profile_json) 
        // const request =  axios
        //     .post('users', {profile})
        //     .then((response) => {
        //         console.log(response)

        //     }
        //     )
        //     .catch(err=>err)
        // async function postData() {
        //         const request = await axios
        //         .post('users', {profile})
        //         .then((response) => {
        //             console.log(response)
    
        //         }
        //         )
        //         .catch(err=>err)
    
        //     }
        //     postData();
    
            // console.log("message:",request.data)

        // }
        // postData();                               //update the database
        dispatch(setMyProfile(profile)) //updates the state

        
        

        
    };
  
  