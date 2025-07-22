import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from '../slicesName';
import { TIngredient } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../../utils/burger-api';

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
  }
);

const findIngredient = (arr: TIngredient[], id: string) =>
  arr.filter((item) => item._id === id)[0];

const ingredientsSlice = createSlice({
  name: SLICE_NAME.INGREDIENTS,
  initialState,
  reducers: {
    openIngredient: (state, action: PayloadAction<string>) => {
      state.ingredientData = findIngredient(state.ingredients, action.payload);
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
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectIngredientData: (sliceState) => sliceState.ingredientData
  }
});

export default ingredientsSlice;
