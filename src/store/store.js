import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import topSalesReducer from './slices/topSalesSlice';
import productsReducer from './slices/productsSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    topSales: topSalesReducer,
    products: productsReducer
  }
});