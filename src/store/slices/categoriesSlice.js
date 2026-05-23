import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:7070/api/categories';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return [{ id: 0, title: 'Все' }, ...data];
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    selected: 0,
    status: 'idle',
    error: null
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setSelectedCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;