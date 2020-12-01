import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import usersReducer from '../features/usersSlice';

const store = configureStore({
    reducer: {
      users: usersReducer,

    }
  });

  export default store;