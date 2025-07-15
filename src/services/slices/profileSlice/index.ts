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
