import profileSlice, { fetchUser, loginUser, registerUser } from './profile';

export const profileActions = {
  ...profileSlice.actions,
  fetchUser,
  loginUser,
  registerUser
};
export const profileSelectors = profileSlice.selectors;
