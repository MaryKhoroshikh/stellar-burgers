import profileSlice, {
  fetchUser,
  loginUser,
  registerUser,
  logoutUser,
  updateUser
} from './profile';

export const profileActions = {
  ...profileSlice.actions,
  fetchUser,
  loginUser,
  registerUser,
  logoutUser,
  updateUser
};
export const profileSelectors = profileSlice.selectors;
