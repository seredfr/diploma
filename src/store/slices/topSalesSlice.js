import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:7070/api/top-sales';

export const fetchTopSales = createAsyncThunk(
  'topSales/fetchTopSales',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTopSales.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchTopSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ошибка загрузки хитов продаж';
      });
  }
});

export const { clearError } = topSalesSlice.actions;
export default topSalesSlice.reducer;