import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './features/userSlice';
import { AuthApi } from './api/AuthApi';
import { StudentListApi } from './api/StudentListApi';
import { TraineeListApi } from './api/TraineeListApi';
import { ContactUsApi } from './api/ContactUsApi';
import { TrainerVideosApi } from './api/TrainerVideosApi';
import { RatingsApi } from './api/RatingsApi';
import { CategoryApi } from './api/CategoryApi';
import { LevelApi } from './api/LevelApi';



export const store = configureStore({
  reducer: {
    User: UserReducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [StudentListApi.reducerPath]:StudentListApi.reducer,
    [TraineeListApi.reducerPath]:TraineeListApi.reducer,
    [ContactUsApi.reducerPath]:ContactUsApi.reducer,
    [TrainerVideosApi.reducerPath]:TrainerVideosApi.reducer,
    [RatingsApi.reducerPath]:RatingsApi.reducer,
    [CategoryApi.reducerPath]:CategoryApi.reducer,
    [LevelApi.reducerPath]:LevelApi.reducer,

  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      // AuthApi.middleware
      AuthApi.middleware,
      StudentListApi.middleware,
      TraineeListApi.middleware,
      ContactUsApi.middleware,
      TrainerVideosApi.middleware,
      RatingsApi.middleware,
      CategoryApi.middleware,
      LevelApi.middleware,



    ]),
});
