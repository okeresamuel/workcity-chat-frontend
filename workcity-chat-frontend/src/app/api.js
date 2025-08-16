import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let isDev = import.meta.env.MODE === "development";

const baseQuery = fetchBaseQuery({
  baseUrl: isDev ? 'http://localhost:3001' : "",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().AuthSlice.userDetails.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 402) {
    const refreshToken = await baseQuery("/refresh", api, extraOptions);
    if (refreshToken.data) {
      api.dispatch(setCredentials(refreshToken.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshToken?.error?.status === 403) {
        refreshToken.error.data = "Your login has expired";
      }
      return refreshToken;
    }
  }
  return result;
};


export const BaseApi = createApi({
  reducerPath: "BaseApi",
  baseQuery: baseQueryReauth,
  tagTypes: ["Property"],
  endpoints: () => ({}),
});