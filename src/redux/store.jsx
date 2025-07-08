import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./Token";
import CartReducer from "./cart"

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    cart: CartReducer
  }
});

export default store;