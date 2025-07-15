import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from '../slicesName';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

export interface OrderState {
  newOrderRequest: boolean;
  newOrderModalData: TOrder | null;
  orderByNumber: TOrder | null;
  isOrderByNumberLoading: boolean;
}

const initialState: OrderState = {
  newOrderRequest: false,
  newOrderModalData: null,
  orderByNumber: null,
  isOrderByNumberLoading: false
};

export const fetchOrder = createAsyncThunk(
  `${SLICE_NAME.ORDER}/fetchOrder`,
  async (orderData: string[]) => {
    const data = await orderBurgerApi(orderData);
    return data;
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  `${SLICE_NAME.ORDER}/fetchOrderByNumber`,
  async (orderNumber: number) => {
    const data = await getOrderByNumberApi(orderNumber);
    return data;
  }
);

const orderSlice = createSlice({
  name: SLICE_NAME.ORDER,
  initialState,
  reducers: {
    closeModal: (state) => {
      state.newOrderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.newOrderRequest = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.newOrderRequest = false;
        state.newOrderModalData = action.payload.order;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.newOrderRequest = false;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isOrderByNumberLoading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isOrderByNumberLoading = false;
        state.orderByNumber = action.payload.orders[0];
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.isOrderByNumberLoading = false;
      });
  },
  selectors: {
    selectNewOrderRequest: (sliceState) => sliceState.newOrderRequest,
    selectNewOrderModalData: (sliceState) => sliceState.newOrderModalData,
    selectIsByNumberLoading: (sliceState) => sliceState.isOrderByNumberLoading,
    selectOrderByNumber: (sliceState) => sliceState.orderByNumber
  }
});

export default orderSlice;
