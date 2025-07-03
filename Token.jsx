import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: !!localStorage.getItem("_token"),
    token: localStorage.getItem("_token") || null
  },
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLogged = true;
      localStorage.setItem("_token",action.payload)
    },
    logout(state) {
      state.token = null;
      state.isLogged = false;
      localStorage.removeItem("_token")
    },
}});

export const { login, logout} = authSlice.actions;
export const AuthReducer = authSlice.reducer;