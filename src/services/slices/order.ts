import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from './slicesName';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

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

export const fetchOrder = createAsyncThunk(
  `${SLICE_NAME.ORDER}/fetchOrder`,
  async (orderData: string[]) => {
    const data = await orderBurgerApi(orderData);
    return data;
  }
);

const orderSlice = createSlice({
  name: SLICE_NAME.ORDER,
  initialState,
  reducers: {
    closeModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.orderRequest = false;
      });
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
export default orderSlice;
