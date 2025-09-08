import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: true,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    removeUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
