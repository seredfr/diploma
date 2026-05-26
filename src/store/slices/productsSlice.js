import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:7070/api/items';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ categoryId = 0, offset = 0, q = '' }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (categoryId !== 0) params.append('categoryId', categoryId);
      if (offset > 0) params.append('offset', offset);
      if (q) params.append('q', q);
      
      const url = `${API_URL}?${params.toString()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return { items: data, offset, hasMore: data.length === 6 };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    offset: 0,
    hasMore: true,
    searchQuery: ''
  },
  reducers: {
    clearProducts: (state) => {
      state.items = [];
      state.offset = 0;
      state.hasMore = true;
      state.status = 'idle';
      state.error = null;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { items, offset, hasMore } = action.payload;
        if (offset === 0) {
          state.items = items;
        } else {
          state.items = [...state.items, ...items];
        }
        state.offset = offset + items.length;
        state.hasMore = hasMore;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ошибка загрузки товаров';
      });
  }
});

export const { clearProducts, setSearchQuery, clearError } = productsSlice.actions;
export default productsSlice.reducer;