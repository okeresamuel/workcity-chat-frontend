import { BaseApi } from "../../app/api";


const extendedApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    //FETCH USERS BY ROLE API
    fetchUserByRole: builder.mutation({
      query: (role) => ({
        url: "/fetchuser",
        method: "POST",
        body: role,
      }),
    }),
  }),
});

export const { useFetchUserByRoleMutation } = extendedApi;