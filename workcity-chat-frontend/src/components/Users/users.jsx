import React, { useEffect, useState } from 'react';
import useFetchUserByRole from '../../hooks/useUsers';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useFetchUserChats from '../../hooks/useChats';
import { setSelectedChat } from '../../features/chatslice/chatSlice';

const UserList = () => {

  const userData = useSelector(state => state.AuthSlice.userDetails);
  const allChats = useSelector(state => state.ChatSlice.userChats.data);
  const { usersIsLoading, users, handleFetchUsers } = useFetchUserByRole()
  const { createNewChatIsLoading, handleCreateNewChat, createNewChatData}  = useFetchUserChats()
  const [ userRole, setUserRole ] = useState()
  const [ name, setName] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
       dispatch(setSelectedChat({...chat, role:role, username:username, avatar:"👩‍💻"}))
       navigate("/chatroom")
    }
  }

  useEffect(()=>{
   handleFetchUsers({role: 'user'})
  }, [])

  return (
   <div className="max-w-md p-4">
  <h2 className="text-xl font-bold mb-4">Users</h2>
  <div className="space-y-3">
    {usersIsLoading ? (
      // Loading state
      <>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm animate-pulse"
          >
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4 mb-3"></div>
            <div className="h-7 bg-gray-200 rounded-full w-20"></div>
          </div>
        ))}
      </>
    ) : users?.users?.length > 0 ? (
      // Users list
      users.users.map((user) => (
        <div 
          key={user.id}
          onClick={() => openChat(user._id, user.role, user.username)}
          className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="font-medium text-gray-900">{user.username}</div>
          <div className="text-sm text-gray-600">{user.email}</div>
          <div className="text-sm text-blue-600 mt-1">{user.role}</div>
          <div className="flex items-center space-x-2 mt-2">
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
      ))
    ) : (
      // Empty state
      <div className="p-8 border border-gray-200 rounded-lg bg-gray-50 text-center">
        <svg 
          className="w-12 h-12 mx-auto text-gray-400 mb-3" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <h3 className="text-base font-semibold text-gray-800 mb-1">
          No Users Available
        </h3>
        <p className="text-sm text-gray-600">
          There are no users to chat with at the moment.
        </p>
      </div>
    )}
  </div>
</div>
  );
};

export default UserList;