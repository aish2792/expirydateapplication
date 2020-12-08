import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import usersReducer from '../features/usersSlice';

const store = configureStore({
    reducer: {
      users: usersReducer,

    },
    middleware: getDefaultMiddleware({
      serializableCheck: false
   })
  });

  export default store;