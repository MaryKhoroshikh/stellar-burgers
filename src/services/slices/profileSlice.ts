import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from './slicesName';
import { TOrder, TUser } from '@utils-types';
import {
  forgotPasswordApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TRequestStatus = 'load' | 'done' | 'fail';

export interface ProfileState {
  user: TUser;
  orders: TOrder[];
  profileCheck: boolean;
  requestStatus: TRequestStatus;
}

const initialState: ProfileState = {
  user: {
    name: '',
    email: ''
  },
  orders: [],
  profileCheck: false,
  requestStatus: 'done'
};

export const fetchUser = createAsyncThunk(
  `${SLICE_NAME.PROFILE}/fetchUser`,
  async () => {
    const data = await getUserApi();
    return data;
  }
);

export const registerUser = createAsyncThunk(
  `${SLICE_NAME.PROFILE}/registerUser`,
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  `${SLICE_NAME.PROFILE}/loginUser`,
  async (userData: TRegisterData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const forgotPassword = createAsyncThunk(
  `${SLICE_NAME.PROFILE}/forgotPassword`,
  async (userData: { email: string }) => {
    const data = await forgotPasswordApi(userData);
    return data;
  }
);

export const resetPassword = createAsyncThunk(
  `${SLICE_NAME.PROFILE}/resetPassword`,
  async (userAswer: { password: string; token: string }) => {
    const data = await resetPasswordApi(userAswer);
    return data;
  }
);

export const updateUser = createAsyncThunk(
  `${SLICE_NAME.PROFILE}/updateUser`,
  async (userData: TRegisterData) => {
    const data = await updateUserApi(userData);
    return data;
  }
);

export const logoutUser = createAsyncThunk(
  `${SLICE_NAME.PROFILE}/logoutUser`,
  async () => {
    const data = await logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
    });
    return data;
  }
);

export const fetchUserOrders = createAsyncThunk(
  `${SLICE_NAME.PROFILE}/fetchUserOrders`,
  async () => {
    const data = await getOrdersApi();
    return data;
  }
);

const profileSlice = createSlice({
  name: SLICE_NAME.PROFILE,
  initialState,
  reducers: {
    setProfileCheck: (state) => {
      state.profileCheck = true;
    },
    setInitialState: (state) => {
      state = initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.requestStatus = 'done';
        state.user = action.payload.user;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.requestStatus = 'done';
        state.user = action.payload.user;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.requestStatus = 'done';
        state.user = action.payload.user;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user.name = '';
        state.requestStatus = 'done';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.requestStatus = 'done';
        state.user = action.payload.user;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.requestStatus = 'done';
        state.orders = action.payload;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.requestStatus = 'done';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.requestStatus = 'done';
      })
      .addMatcher(
        (action) =>
          action.type.toString().startsWith('profile/') &&
          action.type.toString().endsWith('/pending'),
        (state) => {
          state.requestStatus = 'load';
        }
      )
      .addMatcher(
        (action) =>
          action.type.toString().startsWith('profile/') &&
          action.type.toString().endsWith('/rejected'),
        (state) => {
          state.requestStatus = 'fail';
        }
      );
  },
  selectors: {
    selectUser: (sliceState) => sliceState.user,
    selectOrders: (sliceState) => sliceState.orders,
    selectRequestStatus: (sliceState) => sliceState.requestStatus,
    profileCheck: (sliceState) => sliceState.profileCheck
  }
});

export default profileSlice;
