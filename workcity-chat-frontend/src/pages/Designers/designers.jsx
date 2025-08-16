import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetchUserByRole from "../../hooks/useUsers";
import { useDispatch, useSelector } from "react-redux";
import useFetchUserChats from "../../hooks/useChats";
import { setSelectedChat } from "../../features/chatslice/chatSlice";


// User Selection Component
const  Designers = () => {
  const userData = useSelector(state => state.AuthSlice.userDetails);
  const allChats = useSelector(state => state.ChatSlice.userChats.data);
  const { usersIsLoading, users, handleFetchUsers } = useFetchUserByRole()
  const { createNewChatIsLoading, handleCreateNewChat , createNewChatData}  = useFetchUserChats()
  const [ userRole, setUserRole ] = useState()
  const [ name, setName] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
   handleFetchUsers({role: 'designer'})
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
     const chat = allChats.data.find(chat => chat.members.map(m => m._id).includes(userData.id) && chat.members.map(m => m._id).includes(selectedUserId))
    if(chat){
       dispatch(setSelectedChat({...chat, role:role, username:username, avatar:"🎨"}))
       navigate("/chatroom")
    }
  }

  return (
<div className="space-y-6 p-10">
  <div className="flex items-center space-x-4">
    <h1 className="text-2xl font-bold text-gray-800">Designers</h1>
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
              d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No Designers Available
          </h3>
          <p className="text-gray-600">
            There are no designers available at the moment. Please check back later.
          </p>
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default Designers