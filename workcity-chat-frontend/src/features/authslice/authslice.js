import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "Auth",
  initialState: {
    userDetails: JSON.parse(localStorage.getItem('userDetails')) || {},
  },
  reducers: {
    setCredentials: (state, action) => {
      state.userDetails = action.payload;
    },
    setLogOutState: (state) => {
      state.userDetails = {};
    },
  },

  
});

export default authSlice.reducer;
export const {
  setCredentials,
  setLogOutState,
} = authSlice.actions;