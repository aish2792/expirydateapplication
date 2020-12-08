import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        id: null,
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
        },
        removeFromMyItems(state, action) {
            let itemId = action.payload;
            state.myItems = state.myItems.filter((el) => el.id !== itemId);
          },
    }
})

export const {
    setId,
    setMyItems,
    updateMyItems,
    setMyProfile,
    setLoading,
    setUsers, 
    setError,
    removeFromMyItems
} = usersSlice.actions


export default usersSlice.reducer


// update the ID of the user
export const updateID = (userId) => async (
    dispatch,
    getState,
  ) => {
      try{
        const user_id = userId['id']
        dispatch(setLoading(true));
        dispatch(setId(user_id))
      }catch (error) {
        console.log("Error in usersSlice.js -> updateID(): ", error.message);	
		dispatch(setError(error.message)) // update error in the state
	} finally {
		dispatch(setLoading(false))
	}  
      
  };

// update myProfile in the state that includes current user's id, firstname, lastname, email 
export const updateMyProfile = (cred) => (
    dispatch,
    getState,
    ) => {

        try{

            const {id, firstName, lastName, email, password} = cred
            const profile = {
                'firstname': firstName,
                'lastname': lastName,
                'email': email,
            }

        dispatch(setMyProfile(profile)) //updates the state with the current user's profile

        }catch (error) {
            console.log("Error in usersSlice.js -> updateMyProfile(): ", error.message);	
            dispatch(setError(error.message)) // update error in the state
        } finally {
            console.log("checked -- updateMyProfile()")
        }  
        
  
    };

// update all the users in the state 
export const fetchUsers = (users) => async (
    dispatch,
    getState,
    ) => {
        try {
            dispatch(setUsers(users))
        } catch (error) {
            console.log("Error in usersSlice.js -> fetchUsers(): ", error.message);	
            dispatch(setError(error.message)) // update error in the state
        }
            
        
    };

// update myItems in the state   
export const updateMyItemsList = (items) => async (
    dispatch,
    getState,
    ) => {
        try{
            dispatch(setMyItems(items))
        } catch (error) {
            console.log("Error in usersSlice.js -> updateMyItemsList(): ", error.message);	
            dispatch(setError(error.message)) // update error in the state
        }
  
    };


// When the users add items, they are updated in the myItems variable in the state
export const updateExistingMyItemsList = (items) => async (
    dispatch,
    getState,
    ) => {
        try{
            dispatch(updateMyItems(items))
        }catch (error) {
            console.log("Error in usersSlice.js -> updateExistingMyItemsList(): ", error.message);	
            dispatch(setError(error.message)) // update error in the state
        }
               
    };

// sets all the variables in the state to their initial values
export const logout = () => dispatch => {
    try {

        dispatch(setId(null))
        dispatch(setMyProfile({}))
        dispatch(setMyItems([]))
        dispatch(setError(null))
    }
    catch (error) {
        console.log("Error in usersSlice.js -> updateExistingMyItemsList(): ", error.message);	
        dispatch(setError(error.message)) // update error in the state
    }
};

// removes item from the list after users delete any item
export const removeItem = (itemid) => dispatch => {
    try {
        dispatch(removeFromMyItems(itemid)) 
    }catch (error) {
        console.log("Error in usersSlice.js -> removeItem(): ", error.message);	
        dispatch(setError(error.message)) // update error in the state
    }
    
}
    


  
  