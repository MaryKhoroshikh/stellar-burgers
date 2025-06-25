import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from './slicesName';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

export interface OrdersListState {
  orders: TOrder[];
  feed:
    | {
        total: number;
        totalToday: number;
      }
    | {};
}

const initialState: OrdersListState = {
  orders: [],
  feed: {}
};

export const fetchFeed = createAsyncThunk(
  `${SLICE_NAME.ORDERS_LIST}/fetchFeed`,
  async () => {
    const data = await getFeedsApi();
    return data;
  }
);

const ordersListSlice = createSlice({
  name: SLICE_NAME.ORDERS_LIST,
  initialState,
  reducers: {
    reducerName: (state, action) => {
      console.log('добавить редьюсеры');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.feed = {
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    });
  },
  selectors: {
    selectOrders: (sliceState) => sliceState.orders,
    selectFeed: (sliceState) => sliceState.feed
  }
});

export const { selectOrders, selectFeed } = ordersListSlice.selectors;

export const ordersListReducer = ordersListSlice.reducer;
