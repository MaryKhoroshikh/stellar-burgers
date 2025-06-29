import profileSlice, {
  fetchUser,
  fetchUserOrders,
  loginUser,
  registerUser,
  updateUser,
  logoutUser
} from './profile';
import orderSlice, { fetchOrder } from './order';
import feedSlice, { fetchFeed } from './feedSlice';
import burgerSlice from './burgerSlice';
import ingredientsSlice from './ingredients';

export const profileSelectors = profileSlice.selectors;
export const profileActions = {
  ...profileSlice.actions,
  fetchUser,
  fetchUserOrders,
  loginUser,
  registerUser,
  updateUser,
  logoutUser
};

export const orderSelectors = orderSlice.selectors;
export const orderAction = {
  ...orderSlice.actions,
  fetchOrder
};

export const feedSelectors = feedSlice.selectors;
export const feedActions = {
  ...feedSlice.actions,
  fetchFeed
};

export const burgerSelectors = burgerSlice.selectors;
export const burgerActions = burgerSlice.actions;

export const ingredientsSelectors = ingredientsSlice.selectors;
export const ingredientsActions = ingredientsSlice.actions;
