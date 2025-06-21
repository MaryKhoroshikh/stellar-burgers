import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from './slicesName';
import { TIngredient } from '@utils-types';

export interface IngridientsState {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isLoading: boolean;
}

const initialState: IngridientsState = {
  buns: [],
  mains: [],
  sauces: [],
  isLoading: true
};

const ingridientsSlice = createSlice({
  name: SLICE_NAME.INGRIDIENTS,
  initialState,
  reducers: {
    addIngridient: (state, action) => {
      console.log('добавлен ингридиент');
    }
  },
  selectors: {
    selectBuns: (sliceState) => sliceState.buns,
    selectMains: (sliceState) => sliceState.mains,
    selectSauces: (sliceState) => sliceState.sauces,
    selectIsLoading: (sliceState) => sliceState.isLoading
  }
});

export const { selectBuns, selectMains, selectSauces, selectIsLoading } =
  ingridientsSlice.selectors;
export const ingridientsReducer = ingridientsSlice.reducer;
