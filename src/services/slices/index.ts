import profileSlice, {
  fetchUser,
  loginUser,
  registerUser,
  logoutUser,
  updateUser
} from './profile';

import orderSlice, { fetchOrder } from './order';

export const profileActions = {
  ...profileSlice.actions,
  fetchUser,
  loginUser,
  registerUser,
  logoutUser,
  updateUser
};
export const profileSelectors = profileSlice.selectors;

export const orderAction = {
  ...orderSlice.actions,
  fetchOrder
};
