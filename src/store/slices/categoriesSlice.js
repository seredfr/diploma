import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:7070/api/categories';

const loadSelectedCategory = () => {
  const saved = sessionStorage.getItem('selectedCategory');
  return saved ? parseInt(saved) : 0;
};

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
    selected: loadSelectedCategory(),
    status: 'idle',
    error: null
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selected = action.payload;
      sessionStorage.setItem('selectedCategory', action.payload);
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setSelectedCategory, clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer;