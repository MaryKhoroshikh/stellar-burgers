import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import ingredientsSlice from './slices/ingredientsSlice/ingredientsSlice';
import burgerSlice from './slices/burgerSlice/burgerSlice';
import feedSlice from './slices/feedSlice/feedSlice';
import profileSlice from './slices/profileSlice/profileSlice';
import orderSlice from './slices/orderSlice/orderSlice';
import { SLICE_NAME } from './slices/slicesName';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  [SLICE_NAME.INGREDIENTS]: ingredientsSlice.reducer,
  [SLICE_NAME.BURGER]: burgerSlice.reducer,
  [SLICE_NAME.FEED]: feedSlice.reducer,
  [SLICE_NAME.PROFILE]: profileSlice.reducer,
  [SLICE_NAME.ORDER]: orderSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
