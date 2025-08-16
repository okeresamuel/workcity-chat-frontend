import { useCreateNewChatMutation, useFetchUserChatsMutation, useGetMessagesMutation, useSendMessageMutation } from "../features/chatslice/chatApi";
import toast from "react-hot-toast";
import { setChats, setSelectedChat } from "../features/chatslice/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function useFetchUserChats() {

 const allChats = useSelector(state => state.ChatSlice.userChats.data);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ fetchUsersChats,  { isLoading: chatsIsLoading, data:chats, error: fetchChatError } ] = useFetchUserChatsMutation();
  const [ createNewChat,   { isLoading: createNewChatIsLoading,  error: createNewChatError, data:createNewChatData } ] = useCreateNewChatMutation();
  const [ sendNewMessage,  { isLoading: sendNewMessageIsLoading,  error: sendNewMessageError }] = useSendMessageMutation()
  const [ getNewMessages,  { isLoading: getNewMessagesIsLoading,  error: getNewMessagesError, data: getNewMessagesData }] = useGetMessagesMutation()


  const handleFetchUsersChats = async (userId) => {
  if(!userId){
   toast.error("User id is required")
   return;  
  }
  const chats = await fetchUsersChats(userId)
  dispatch(setChats(chats))
}

 const handleCreateNewChat = async (members, userId) => {
  if(members.length !== 2){
   toast.error("members ids are required")
   return;  
  }
 const response = await createNewChat(members)
  const chats = await fetchUsersChats(userId)
  dispatch(setChats(chats))
 if(response.success){
    toast.success(response.message)
    const newChat = response.data
    const updatedChat = [...allChats.data, newChat]
    dispatch(setChats(updatedChat))
    dispatch(setSelectedChat(newChat))

 }
}

  const handleSendNewMessage = async (message) => {
  if(!message){
   toast.error("Message is required")
   return;  
  }
  await sendNewMessage(message)
}

 const handleGetMessages = async (chatId) => {
  if(!chatId){
   toast.error("chatId is required")
   return;  
  }
  await getNewMessages(chatId)
}

 

return { 
    chatsIsLoading, 
    chats, 
    fetchChatError, 
    handleFetchUsersChats,

    createNewChatError,
    createNewChatIsLoading,
    createNewChatData,
    handleCreateNewChat,
     
    sendNewMessageError,
    sendNewMessageIsLoading,
    handleSendNewMessage,

    getNewMessagesError,
    getNewMessagesIsLoading,
    getNewMessagesData,
    handleGetMessages,
}}

export default useFetchUserChats;