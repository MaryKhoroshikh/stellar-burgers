import { createAsyncThunk, createSlice, isAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from './slicesName';
import { TOrder, TUser } from '@utils-types';
import { getUserApi, loginUserApi, registerUserApi, TRegisterData } from '@api';
import { setCookie } from '../../utils/cookie';

type TRequestStatus = 'load' | 'done' | 'fail';

export interface ProfileState {
  user: TUser;
  password: string | null;
  orders: TOrder[];
  profileCheck: boolean;
  requestStatus: TRequestStatus;
}

const initialState: ProfileState = {
  user: {
    name: '',
    email: ''
  },
  password: null,
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

// export const forgotPassword = createAsyncThunk(
//   `${SLICE_NAME.PROFILE}/forgotPassword`,
//   async () => {
//     const data = await forgotPasswordApi();
//     return data;
//   }
// );

// export const resetPassword = createAsyncThunk(
//   `${SLICE_NAME.PROFILE}/resetPassword`,
//   async () => {
//     const data = await resetPasswordApi();
//     return data;
//   }
// );

// export const updateUser = createAsyncThunk(
//   `${SLICE_NAME.PROFILE}/updateUser`,
//   async () => {
//     const data = await updateUserApi();
//     return data;
//   }
// );

// export const logoutUser = createAsyncThunk(
//   `${SLICE_NAME.PROFILE}/logoutUser`,
//   async () => {
//     const data = await logoutApi();
//     return data;
//   }
// );

const profileSlice = createSlice({
  name: SLICE_NAME.PROFILE,
  initialState,
  reducers: {
    setProfileCheck: (state) => {
      state.profileCheck = true;
    },
    setLogin: (state, action) => {
      state.user.email;
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
      .addMatcher(
        (action) =>
          action.type === 'profile/fetchUser/pending' ||
          action.type === 'profile/registerUser/pending' ||
          action.type === 'profile/loginUser/pending',
        (state) => {
          state.requestStatus = 'load';
        }
      )
      .addMatcher(
        (action) =>
          action.type === 'profile/fetchUser/rejected' ||
          action.type === 'profile/registerUser/rejected' ||
          action.type === 'profile/loginUser/rejected',
        (state) => {
          state.requestStatus = 'fail';
        }
      );
  },
  selectors: {
    selectUser: (sliceState) => sliceState.user,
    selectOrders: (sliceState) => sliceState.orders,
    selectFetchStatus: (sliceState) => sliceState.requestStatus,
    profileCheck: (sliceState) => sliceState.profileCheck,
    selectPassword: (sliceState) => sliceState.password
  }
});

export const { selectUser, selectOrders, selectFetchStatus } =
  profileSlice.selectors;

export const profileReducer = profileSlice.reducer;
export default profileSlice;
