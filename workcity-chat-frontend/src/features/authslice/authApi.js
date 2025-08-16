import { BaseApi } from "../../app/api";
import { setLogOutState } from "./authSlice";

const extendedApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    //REGISTERATION API
    registerUser: builder.mutation({
      query: (userRegistrationInfo) => ({
        url: "/register",
        method: "POST",
        body: userRegistrationInfo,
      }),
    }),

    //LOGIN API
    login: builder.mutation({
      query: (userLoginInfo) => ({
        url: "/login",
        method: "POST",
        body: userLoginInfo,
      }),
    }),

     //ADDROLE
    addRole: builder.mutation({
      query: (role) => ({
        url: "/addrole",
        method: "POST",
        body: role,
      }),
    }),

    //LOGOUT API
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setLogOutState());
          dispatch(BaseApi.util.resetApiState());
        } catch (error) {
          console.log(error);
        }
      },
    }),

  }),
});

export const {
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useAddRoleMutation,
} = extendedApi;