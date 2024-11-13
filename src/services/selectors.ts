import { RootState } from './store';

export const selectIsLoading = (store: RootState) => store.users.isLoading;
export const selectUser = (store: RootState) => store.users.user;
export const selectIsOrderInProgress = (store: RootState) =>
  store.orders.orderRequest;
export const selectOrderResponse = (store: RootState) =>
  store.orders.orderModalData;
export const selectIngredients = (store: RootState) =>
  store.orders.constructorItems;
export const selectAllIngredients = (store: RootState) =>
  store.orders.allIngredients || [];
export const selectFeeds = (store: RootState) =>
  store.orders.allFeeds || { orders: [], total: 0, totalToday: 0 };
export const selectUserOrders = (store: RootState) =>
  store.orders.allUserOrders || [];
export const selectIsInitialized = (store: RootState) =>
  store.orders.initialized;
