import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './rootReducer.ts';
import {createAPI} from '../api';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
