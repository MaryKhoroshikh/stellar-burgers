import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from './slicesName';
import { TOrder } from '@utils-types';

export interface OrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderData: TOrder | null;
}

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  orderData: {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  }
};

const orderSlice = createSlice({
  name: SLICE_NAME.ORDER,
  initialState,
  reducers: {
    reducerName: (state, action) => {
      console.log('добавить редьюсеры');
    }
  },
  selectors: {
    selectOrderRequest: (sliceState) => sliceState.orderRequest,
    selectOrderModalData: (sliceState) => sliceState.orderModalData,
    selectOrderData: (sliceState) => sliceState.orderData
  }
});

export const { selectOrderRequest, selectOrderModalData, selectOrderData } =
  orderSlice.selectors;

export const orderReducer = orderSlice.reducer;
