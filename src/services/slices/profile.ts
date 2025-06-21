import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from './slicesName';
import { TUser } from '@utils-types';

export interface ProfileState {
  user: TUser;
}

const initialState: ProfileState = {
  user: {
    name: '',
    email: ''
  }
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
    selectUser: (sliceState) => sliceState.user
  }
});

export const { selectUser } = profileSlice.selectors;

export const profileReducer = profileSlice.reducer;
