import { createSlice } from "@reduxjs/toolkit";

// Safe localStorage access
const getStoredCart = () => {
  try {
    const stored = localStorage.getItem("_cart");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
    return [];
  }
};

const getStoredCount = () => {
  try {
    const stored = localStorage.getItem("_count");
    return stored ? Number(stored) : 0;
  } catch (error) {
    console.error("Error parsing count from localStorage:", error);
    return 0;
  }
};

const CartCount = createSlice({
  name: "cart",
  initialState: {
    items: getStoredCart(),
    count: getStoredCount(),
  },
  reducers: {
    increase(state, action) {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      state.count += 1;
      
      // Update localStorage
      try {
        localStorage.setItem("_cart", JSON.stringify(state.items));
        localStorage.setItem("_count", state.count.toString());
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    },
    
    decrease(state, action) {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.count -= 1;
        
        try {
          localStorage.setItem("_cart", JSON.stringify(state.items));
          localStorage.setItem("_count", state.count.toString());
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      }
    },
    
    remove(state, action) {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (itemToRemove) {
        state.count -= itemToRemove.quantity || 1;
        state.items = state.items.filter(item => item.id !== action.payload);
        
        if (state.items.length === 0) {
          state.count = 0;
        }
        
        try {
          localStorage.setItem("_cart", JSON.stringify(state.items));
          localStorage.setItem("_count", state.count.toString());
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      }
    },
    
    loadCart(state, action) {
      state.items = action.payload;
      state.count = action.payload.reduce((total, item) => total + (item.quantity || 1), 0);
      try {
        localStorage.setItem("_cart", JSON.stringify(state.items));
        localStorage.setItem("_count", state.count.toString());
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  }
});

export const { 
  increase, 
  decrease, 
  remove,
  loadCart
} = CartCount.actions;

export default CartCount.reducer;