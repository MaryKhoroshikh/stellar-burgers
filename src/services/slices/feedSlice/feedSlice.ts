import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from '../slicesName';
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
  orderModalData: TOrder | null;
}

const initialState: OrdersListState = {
  orders: [],
  feed: {},
  orderModalData: null
};

export const fetchFeed = createAsyncThunk(
  `${SLICE_NAME.FEED}/fetchFeed`,
  async () => {
    const data = await getFeedsApi();
    return data;
  }
);

const feedSlice = createSlice({
  name: SLICE_NAME.FEED,
  initialState,
  reducers: {
    openOrder: (state, action: PayloadAction<TOrder>) => {
      state.orderModalData = action.payload;
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
    selectFeed: (sliceState) => sliceState.feed,
    selectOrderModalData: (sliceState) => sliceState.orderModalData
  }
});

export default feedSlice;
