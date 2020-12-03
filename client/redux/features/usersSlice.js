import { createSlice } from '@reduxjs/toolkit';



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

export const updateMyProfile = (cred) => async (
    dispatch,
    getState,
    ) => {

        const {email, password, firstname, lastname} = cred
        // console.log(email)
        // console.log(password)
        const profile = {
            'firstname': firstname,
            'lastname': lastname,
            'email': email 
        }
        dispatch(setMyProfile(profile))
        
        

        
    };
  
  