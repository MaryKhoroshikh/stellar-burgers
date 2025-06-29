import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from './slicesName';
import { TIngredient } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  ingredientData: TIngredient | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  ingredientData: null
};

export const fetchIngredients = createAsyncThunk(
  `${SLICE_NAME.INGREDIENTS}/fetchIngredients`,
  async () => {
    const data = await getIngredientsApi();
    return data;
    // buns: data.filter((item) => item.type === 'bun'),
    // mains: data.filter((item) => item.type === 'main'),
    // sauces: data.filter((item) => item.type === 'sauce')
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
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      });
  },
  selectors: {
    selectIngredients: (sliceState) => sliceState.ingredients,
    selectBuns: (sliceState) =>
      sliceState.ingredients.filter((item) => item.type === 'bun'),
    selectMains: (sliceState) =>
      sliceState.ingredients.filter((item) => item.type === 'main'),
    selectSauces: (sliceState) =>
      sliceState.ingredients.filter((item) => item.type === 'sause'),
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectIngredientData: (sliceState) => sliceState.ingredientData
  }
});

export default ingredientsSlice;
