import orderSlice, { fetchOrder, fetchOrderByNumber } from './orderSlice';

export const orderSelectors = orderSlice.selectors;
export const orderAction = {
  ...orderSlice.actions,
  fetchOrder,
  fetchOrderByNumber
};
export default orderSlice.reducer;
