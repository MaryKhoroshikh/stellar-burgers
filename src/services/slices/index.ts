import profileSlice, {
  fetchUser,
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  fetchUserOrders
} from './profile';

import orderSlice, { fetchOrder } from './order';

export const profileActions = {
  ...profileSlice.actions,
  fetchUser,
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  fetchUserOrders
};
export const profileSelectors = profileSlice.selectors;

export const orderAction = {
  ...orderSlice.actions,
  fetchOrder
};
