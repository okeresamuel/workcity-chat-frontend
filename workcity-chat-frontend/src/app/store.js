import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../features/authslice/authslice";
import ChatSlice from "../features/chatslice/chatSlice"
import { BaseApi } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [BaseApi.reducerPath]: BaseApi.reducer,
    AuthSlice: AuthSlice,
    ChatSlice: ChatSlice
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(BaseApi.middleware),
});
setupListeners(store.dispatch);
export default store;