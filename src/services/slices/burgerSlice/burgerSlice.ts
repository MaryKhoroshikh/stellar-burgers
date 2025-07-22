import { createSlice, isAction, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from '../slicesName';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export interface ConstructorState {
  bun: TConstructorIngredient | { price: number; _id: string };
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: { price: 0, _id: '' },
  ingredients: []
};

const moveIngredients = (
  arr: TConstructorIngredient[],
  id: string,
  where: string
) => {
  const index = arr.findIndex((item) => item.id === id);
  if (where === 'up') {
    return [
      ...arr.slice(0, index - 1),
      arr[index],
      arr[index - 1],
      ...arr.slice(index + 1)
    ];
  }
  if (where === 'down') {
    return [
      ...arr.slice(0, index),
      arr[index + 1],
      arr[index],
      ...arr.slice(index + 2)
    ];
  }
  return arr;
};

const deletingIngredient = (arr: TConstructorIngredient[], deletedId: string) =>
  arr.filter((item) => item.id !== deletedId);

const addingIngredients = (
  arr: TConstructorIngredient[],
  newItem: TConstructorIngredient
) => {
  arr.push(newItem);
  return arr;
};

const burgerSlice = createSlice({
  name: SLICE_NAME.BURGER,
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients = addingIngredients(
          state.ingredients,
          action.payload
        );
      }
    },
    moveUp: (state, action: PayloadAction<string>) => {
      state.ingredients = moveIngredients(
        state.ingredients,
        action.payload,
        'up'
      );
    },
    moveDown: (state, action: PayloadAction<string>) => {
      state.ingredients = moveIngredients(
        state.ingredients,
        action.payload,
        'down'
      );
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = deletingIngredient(state.ingredients, action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === 'order/fetchOrder/fulfilled',
      (state) => (state = initialState)
    );
  },
  selectors: {
    selectBun: (sliceState) => sliceState.bun,
    selectIngredients: (sliceState) => sliceState.ingredients
  }
});

export default burgerSlice;
