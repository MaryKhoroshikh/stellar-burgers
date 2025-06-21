import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from './slicesName';
import { TIngredient } from '@utils-types';

export interface IngredientsState {
  ingredients: {
    buns: TIngredient[];
    mains: TIngredient[];
    sauces: TIngredient[];
  };
  isLoading: boolean;
  ingredientData: TIngredient | null;
}

const initialState: IngredientsState = {
  ingredients: {
    buns: [],
    mains: [],
    sauces: []
  },
  isLoading: false,
  ingredientData: null
};

const ingredientsSlice = createSlice({
  name: SLICE_NAME.INGREDIENTS,
  initialState,
  reducers: {
    reducerName: (state, action) => {
      console.log('добавить редьюсеры');
    }
  },
  selectors: {
    selectBuns: (sliceState) => sliceState.ingredients.buns,
    selectMains: (sliceState) => sliceState.ingredients.mains,
    selectSauces: (sliceState) => sliceState.ingredients.sauces,
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectIngredientData: (sliceState) => sliceState.ingredientData
  }
});

export const {
  selectBuns,
  selectMains,
  selectSauces,
  selectIsLoading,
  selectIngredientData
} = ingredientsSlice.selectors;

export const ingredientsReducer = ingredientsSlice.reducer;
