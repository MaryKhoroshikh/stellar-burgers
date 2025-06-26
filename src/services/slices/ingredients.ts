import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from './slicesName';
import { TIngredient } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export interface IngredientsState {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isLoading: boolean;
  ingredientData: TIngredient | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  isLoading: false,
  ingredientData: null
};

export const fetchIngredients = createAsyncThunk(
  `${SLICE_NAME.INGREDIENTS}/fetchIngredients`,
  async () => {
    const data = await getIngredientsApi();
    return {
      buns: data.filter((item) => item.type === 'bun'),
      mains: data.filter((item) => item.type === 'main'),
      sauces: data.filter((item) => item.type === 'sauce')
    };
  }
);

const ingredientsSlice = createSlice({
  name: SLICE_NAME.INGREDIENTS,
  initialState,
  reducers: {
    openIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredientData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.buns = action.payload.buns;
        state.mains = action.payload.mains;
        state.sauces = action.payload.sauces;
        state.isLoading = false;
      });
  },
  selectors: {
    selectBuns: (sliceState) => sliceState.buns,
    selectMains: (sliceState) => sliceState.mains,
    selectSauces: (sliceState) => sliceState.sauces,
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
export const { openIngredient } = ingredientsSlice.actions;
