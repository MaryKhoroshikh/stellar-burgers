import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from './slicesName';
import { TOrder } from '@utils-types';

export interface FeedState {
  orders: TOrder[];
}

const initialState: FeedState = {
  orders: []
};

const feedSlice = createSlice({
  name: SLICE_NAME.FEED,
  initialState,
  reducers: {
    reducerName: (state, action) => {
      console.log('добавить редьюсеры');
    }
  },
  selectors: {
    selectFeedItems: (sliceState) => sliceState.orders
  }
});

export const { selectFeedItems } = feedSlice.selectors;

export const feedReducer = feedSlice.reducer;
