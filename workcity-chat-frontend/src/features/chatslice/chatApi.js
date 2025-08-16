import { BaseApi } from "../../app/api";


const extendedApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    //FETCH USER Chats
    fetchUserChats: builder.mutation({
      query: (userId) => ({
        url: `/chats/${userId}`,
        method: "GET",
      }),
    }),

     //Create new chats
    createNewChat: builder.mutation({
      query: (members) => ({
        url: `/createchat`,
        method: "POST",
        body: { members }
      }),
    }),

    sendMessage: builder.mutation({
      query: (message) => ({
        url: `/createmessage`,
        method: "POST",
        body: message
      }),
    }),

   getMessages: builder.mutation({
      query: (chatId) => ({
        url: `/getmessage/${chatId}`,
        method: "GET",
      }),
    }),

  }),
});

export const { useFetchUserChatsMutation, useCreateNewChatMutation, useSendMessageMutation, useGetMessagesMutation } = extendedApi;