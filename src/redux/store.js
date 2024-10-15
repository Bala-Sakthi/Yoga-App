import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './features/userSlice';
import { AuthApi } from './api/AuthApi';
import { StudentListApi } from './api/StudentListApi';



export const store = configureStore({
  reducer: {
    User: UserReducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [StudentListApi.reducerPath]:StudentListApi.reducer,

  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      // AuthApi.middleware
      AuthApi.middleware,
      StudentListApi.middleware,



    ]),
});
