import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetchUserByRole from "../../hooks/useUsers";
import { useDispatch, useSelector } from "react-redux";
import useFetchUserChats from "../../hooks/useChats";
import { setSelectedChat } from "../../features/chatslice/chatSlice";

// User Selection Component
const  Support  = () => {
  const userData = useSelector(state => state.AuthSlice.userDetails);
  const allChats = useSelector(state => state.ChatSlice.userChats.data);
  const { usersIsLoading, users, handleFetchUsers } = useFetchUserByRole()
  const { createNewChatIsLoading, handleCreateNewChat , createNewChatData}  = useFetchUserChats()
  const [ userRole, setUserRole ] = useState()
  const [ name, setName] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
   handleFetchUsers({role: 'support'})
  }, [])

  const startChart = async (searchedUserId, role, username) => {
    handleCreateNewChat([userData.id, searchedUserId], userData.id)
    setUserRole(role)
    setName(username)
  }

  useEffect(()=>{
      if (createNewChatData) {
        dispatch(setSelectedChat({
          ...createNewChatData, 
          role: userRole, 
          username: name, 
          avatar: "👩‍💻"
        }));
      } 
  }, [createNewChatData])



  const openChat = (selectedUserId, role, username) => {
     const chat = allChats?.data?.find(chat => chat.members.map(m => m._id).includes(userData.id) && chat.members.map(m => m._id).includes(selectedUserId))
    if(chat){
       dispatch(setSelectedChat({...chat, role:role, username:username, avatar:"👩‍💻"}))
       navigate("/chatroom")
    }
  }

return (
<div className="space-y-6 p-10">
  <div className="flex items-center space-x-4">
    <h1 className="text-2xl font-bold text-gray-800">Customer Support</h1>
  </div>

  <div className="grid gap-4">
    {usersIsLoading ? (
      // Loading state
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-pulse"
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded-full w-20"></div>
            </div>
          </div>
        ))}
      </div>
    ) : users?.users?.length > 0 ? (
      // Users list
      users.users.map((user) => (
        <div
          key={user.id}
          onClick={() => openChat(user._id, user.role, user.username)}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 border bg-gray-100 rounded-full flex items-center justify-center text-lg">
                {user.avatar}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white bg-green-500`}></div>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{user.username}</h3>
              <p className="text-sm text-gray-600">{user.role}</p>
            </div>
            <div className="flex items-center space-x-2">
              {!allChats?.data?.find((chat) => 
                chat.members.map(m => m._id).includes(user._id)
              ) && (
                <button 
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    startChart(user._id, user.role, user.username);
                  }}
                >
                  Start Chat
                </button>
              )}
            </div>
          </div>
        </div>
      ))
    ) : (
      // Empty state
      <div className="bg-gray-50 rounded-xl p-12 text-center">
        <div className="max-w-sm mx-auto">
          <svg 
            className="w-16 h-16 mx-auto text-gray-400 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No Support Agents Available
          </h3>
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default Support