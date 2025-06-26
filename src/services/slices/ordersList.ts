import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from './slicesName';
import { TOrder } from '@utils-types';
import { getFeedsApi, getOrderByNumberApi } from '@api';

export interface OrdersListState {
  orders: TOrder[];
  feed:
    | {
        total: number;
        totalToday: number;
      }
    | {};
  orderModalData: TOrder | null;
}

const initialState: OrdersListState = {
  orders: [],
  feed: {},
  orderModalData: null
};

export const fetchFeed = createAsyncThunk(
  `${SLICE_NAME.ORDERS_LIST}/fetchFeed`,
  async () => {
    const data = await getFeedsApi();
    return data;
  }
);

export const fetchOrder = createAsyncThunk(
  `${SLICE_NAME.ORDERS_LIST}/fetchOrder`,
  async (param: number) => {
    const data = await getOrderByNumberApi(param);
    return data.orders[0];
  }
);

const ordersListSlice = createSlice({
  name: SLICE_NAME.ORDERS_LIST,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.feed = {
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload;
      });
  },
  selectors: {
    selectOrders: (sliceState) => sliceState.orders,
    selectFeed: (sliceState) => sliceState.feed,
    selectOrderModalData: (sliceState) => sliceState.orderModalData
  }
});

export const { selectOrders, selectFeed } = ordersListSlice.selectors;

export const ordersListReducer = ordersListSlice.reducer;
export const { selectOrderModalData } = ordersListSlice.selectors;
