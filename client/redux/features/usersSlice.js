import { createSlice } from '@reduxjs/toolkit';


export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        id: null,
        isLoggedIn: false,
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
        setItems(state, action) {
			state.items = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    }
})

export const {
    setId,
    setItems,
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
  
  