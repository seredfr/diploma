import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:7070/api/top-sales';

export const fetchTopSales = createAsyncThunk(
  'topSales/fetchTopSales',
  async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  }
);

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopSales.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTopSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default topSalesSlice.reducer;