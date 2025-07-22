import feedSlice, { fetchFeed } from './feedSlice';

export const feedSelectors = feedSlice.selectors;
export const feedActions = {
  ...feedSlice.actions,
  fetchFeed
};
export default feedSlice.reducer;
