import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    message: null,
  },
  reducers: {
    setError: (state, action) => {
      state.message = action.payload;
    },
    removeError: (state) => {
      state.message = null;
    },
  },
});

export const { setError, removeError } = errorSlice.actions;
export default errorSlice.reducer;
