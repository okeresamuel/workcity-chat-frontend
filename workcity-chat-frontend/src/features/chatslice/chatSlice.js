import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "Chats",
  initialState: {
    userChats: {},
    selectedChat: null
  },
  reducers: {
    setChats: (state, action) => {
      state.userChats = action.payload;
    },
     setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },

  
});

export default authSlice.reducer;
export const { setChats, setSelectedChat} = authSlice.actions;