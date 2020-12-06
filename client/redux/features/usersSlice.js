import { createSlice } from '@reduxjs/toolkit';


// import * as Sentry from '@sentry/react-native';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        id: null,
        isLoggedIn: false,
        myProfile: {},
        myItems: [],
        users: [],
        loading: false,
        error: null,
    },
    reducers: {
        setId(state, action) {
			state.id = action.payload
        },
        setMyItems(state, action) {
			state.myItems = action.payload
        },
        updateMyItems(state, action) {
			state.myItems = [ ...state.myItems, action.payload ]
        },
        setMyProfile(state, action) {
			state.myProfile = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setUsers(state, action) {
			state.users = action.payload
        },
        updateUsers(state, action) {
            state.users = [ ...state.users, action.payload ]
        },
        setError(state, action) {
            state.error = action.payload
        }
    }
})

export const {
    setId,
    setMyItems,
    updateMyItems,
    setMyProfile,
    setLoading,
    setUsers, 
    setError
} = usersSlice.actions


export default usersSlice.reducer



export const updateID = (userId) => async (
    dispatch,
    getState,
  ) => {
      try{

        const user_id = userId['id']
        dispatch(setLoading(true));
        dispatch(setId(user_id))
      }catch (error) {
		// Sentry.withScope(function (scope) {
		// 	scope.setTag("page.file", "usersSlice");
		// 	scope.setTag("page.function", "signup");
		// 	scope.setLevel("warning");
        // 	Sentry.captureException(new Error(error));
        console.log("Error in usersSlice.js -> signup(): ", error);
		
		
			console.log("Error in usersSlice.js -> signup(): ", error);
		
		dispatch(setError(error.message)) // Auth Error
	} finally {
		dispatch(setLoading(false))

	}
      
      
  };

export const updateCredentials = (cred) => async (
    dispatch,
    getState,
    ) => {

        console.log({cred})

    };

export const updateMyProfile = (cred) => (
    dispatch,
    getState,
    ) => {

        const {id, firstName, lastName, email, password} = cred
        const profile = {
            'firstname': firstName,
            'lastname': lastName,
            'email': email,
        }

        dispatch(setMyProfile(profile)) //updates the state wwith the current user's profile
  
    };

export const fetchUsers = (users) => async (
    dispatch,
    getState,
    ) => {

            let userslist = users
            dispatch(setUsers(users))
            

        
    };

export const updateMyItemsList = (items) => async (
    dispatch,
    getState,
    ) => {

            dispatch(setMyItems(items))
            

        
    };

export const updateExistingMyItemsList = (items) => async (
    dispatch,
    getState,
    ) => {

            console.log("update")
            dispatch(updateMyItems(items))
            

        
    };


export const logout = () => dispatch => {
    try {

        dispatch(setId(null))
        dispatch(setMyProfile({}))
        dispatch(setMyItems([]))
        dispatch(setError(null))
    }
    catch (error) {
        console.log(error.message)

    }

    // } catch (error) {
    //     Sentry.withScope(function (scope) {
    //         scope.setTag("page.file", "usersSlice");
    //         scope.setTag("page.function", "logout");
    //         Sentry.captureException(new Error(error));
    //     });
        
    //         console.log("Error in usersSlice.js -> logout(): ", error);
        
    //     dispatch(setError(error.message))
    // } finally {
    //     dispatch(setLoading(false))
    // }
};
    


  
  