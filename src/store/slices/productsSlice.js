import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:7070/api/items';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ categoryId = 0, offset = 0, q = '' }) => {
    const params = new URLSearchParams();
    if (categoryId !== 0) params.append('categoryId', categoryId);
    if (offset > 0) params.append('offset', offset);
    if (q) params.append('q', q);
    
    const url = `${API_URL}?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();
    return { items: data, offset, hasMore: data.length === 6 };
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
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
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
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { clearProducts, setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;