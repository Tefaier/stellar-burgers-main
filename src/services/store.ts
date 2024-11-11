import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import rootSliceReducer from './rootSlice';
import orderSliceReducer from './orderSlice';

const rootReducer = rootSliceReducer; // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: {
    users: rootReducer,
    orders: orderSliceReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
