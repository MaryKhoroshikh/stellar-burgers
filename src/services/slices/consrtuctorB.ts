import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from './slicesName';
import { TConstructorIngredient, TOrder } from '@utils-types';

export interface ConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | { price: number; _id: string };
    ingredients: TConstructorIngredient[];
  };
}

const initialState: ConstructorState = {
  constructorItems: {
    bun: { price: 0, _id: '' },
    ingredients: []
  }
};

const constructorSlice = createSlice({
  name: SLICE_NAME.CONSTRUCTOR_BURGER,
  initialState,
  reducers: {
    reducerName: (state, action) => {
      console.log('добавить редьюсеры');
    }
  },
  selectors: {
    selectConstructorItems: (sliceState) => sliceState.constructorItems
  }
});

export const { selectConstructorItems } = constructorSlice.selectors;

export const constructorReducer = constructorSlice.reducer;
