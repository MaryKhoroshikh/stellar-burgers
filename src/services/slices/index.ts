import profileSlice, {
  fetchUser,
  loginUser,
  registerUser,
  logoutUser
} from './profile';

export const profileActions = {
  ...profileSlice.actions,
  fetchUser,
  loginUser,
  registerUser,
  logoutUser
};
export const profileSelectors = profileSlice.selectors;
