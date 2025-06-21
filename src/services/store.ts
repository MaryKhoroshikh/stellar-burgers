import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { ingridientsReducer } from './slices/ingridients';
import { constructorReducer } from './slices/consrtuctor';
import { feedReducer } from './slices/feed';
import { SLICE_NAME } from './slices/slicesName';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  [SLICE_NAME.INGRIDIENTS]: ingridientsReducer,
  [SLICE_NAME.CONSTRUCTOR]: constructorReducer,
  [SLICE_NAME.FEED]: feedReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
