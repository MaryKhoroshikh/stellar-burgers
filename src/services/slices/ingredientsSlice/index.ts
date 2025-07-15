import ingredientsSlice, { fetchIngredients } from './ingredientsSlice';

export const ingredientsSelectors = ingredientsSlice.selectors;
export const ingredientsActions = {
  ...ingredientsSlice.actions,
  fetchIngredients
};
export default ingredientsSlice.reducer;
