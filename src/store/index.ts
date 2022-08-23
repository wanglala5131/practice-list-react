import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from 'reducers/userReducer';
import { loadingReducer } from 'reducers/loadingReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
