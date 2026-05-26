import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  const saved = localStorage.getItem('cart');
  return saved ? JSON.parse(saved) : [];
};

const saveCartToStorage = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(),
    status: 'idle',
    error: null
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, title, size, price, img } = action.payload;
      const existingIndex = state.items.findIndex(
        item => item.id === id && item.size === size
      );
      
      if (existingIndex !== -1) {
        state.items[existingIndex].quantity += 1;
      } else {
        state.items.push({
          id,
          title,
          size,
          price,
          img,
          quantity: 1
        });
      }
      saveCartToStorage(state.items);
    },
    
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(
        item => !(item.id === id && item.size === size)
      );
      saveCartToStorage(state.items);
    },
    
    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const item = state.items.find(
        item => item.id === id && item.size === size
      );
      if (item) {
        item.quantity = Math.min(10, Math.max(1, quantity));
        saveCartToStorage(state.items);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;