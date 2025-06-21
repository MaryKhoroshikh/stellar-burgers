import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from './slicesName';
import { TOrder } from '@utils-types';

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

const ordersListSlice = createSlice({
  name: SLICE_NAME.ORDERS_LIST,
  initialState,
  reducers: {
    reducerName: (state, action) => {
      console.log('добавить редьюсеры');
    }
  },
  selectors: {
    selectOrders: (sliceState) => sliceState.orders,
    selectFeed: (sliceState) => sliceState.feed
  }
});

export const { selectOrders, selectFeed } = ordersListSlice.selectors;

export const ordersListReducer = ordersListSlice.reducer;
