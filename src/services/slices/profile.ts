import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from './slicesName';
import { TOrder, TUser } from '@utils-types';

export interface ProfileState {
  user: TUser;
  orders: TOrder[];
}

const initialState: ProfileState = {
  user: {
    name: '',
    email: ''
  },
  orders: []
};

const profileSlice = createSlice({
  name: SLICE_NAME.PROFILE,
  initialState,
  reducers: {
    reducerName: (state, action) => {
      console.log('добавить редьюсеры');
    }
  },
  selectors: {
    selectUser: (sliceState) => sliceState.user,
    selectOrders: (sliceState) => sliceState.orders
  }
});

export const { selectUser, selectOrders } = profileSlice.selectors;

export const profileReducer = profileSlice.reducer;
