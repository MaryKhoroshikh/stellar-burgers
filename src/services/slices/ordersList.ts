import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

const getOrderFromList = (ordersArr: TOrder[], orderOpenedId: string) =>
  ordersArr.filter((item) => item._id === orderOpenedId)[0];

const ordersListSlice = createSlice({
  name: SLICE_NAME.ORDERS_LIST,
  initialState,
  reducers: {
    openOrder: (state, action: PayloadAction<string>) => {
      state.orderModalData = getOrderFromList(state.orders, action.payload);
      getOrderFromList(state.orders, action.payload);
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

export const { selectOrders, selectFeed } = ordersListSlice.selectors;

export const ordersListReducer = ordersListSlice.reducer;
export default ordersListSlice;
