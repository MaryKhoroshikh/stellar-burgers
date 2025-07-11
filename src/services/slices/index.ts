import profileSlice, {
  fetchUser,
  fetchUserOrders,
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  forgotPassword,
  resetPassword
} from './profileSlice';
import orderSlice, { fetchOrder, fetchOrderByNumber } from './orderSlice';
import feedSlice, { fetchFeed } from './feedSlice';
import burgerSlice from './burgerSlice';
import ingredientsSlice, { fetchIngredients } from './ingredientsSlice';

export const profileSelectors = profileSlice.selectors;
export const profileActions = {
  ...profileSlice.actions,
  fetchUser,
  fetchUserOrders,
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  forgotPassword,
  resetPassword
};

export const orderSelectors = orderSlice.selectors;
export const orderAction = {
  ...orderSlice.actions,
  fetchOrder,
  fetchOrderByNumber
};

export const feedSelectors = feedSlice.selectors;
export const feedActions = {
  ...feedSlice.actions,
  fetchFeed
};

export const burgerSelectors = burgerSlice.selectors;
export const burgerActions = burgerSlice.actions;

export const ingredientsSelectors = ingredientsSlice.selectors;
export const ingredientsActions = {
  ...ingredientsSlice.actions,
  fetchIngredients
};
