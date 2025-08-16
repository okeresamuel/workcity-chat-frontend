import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useFetchUserByRole from "../../hooks/useUsers";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import useFetchUserChats from "../../hooks/useChats";
import useSocket from "../../hooks/useSocket";

const ChatRoom = () => {

 const selectedChat = useSelector(state => state.ChatSlice.selectedChat);
 const userData = useSelector(state => state.AuthSlice.userDetails);
 const { handleSendNewMessage, sendNewMessageIsLoading } =  useFetchUserChats()
 const { handleGetMessages, getNewMessagesIsLoading, getNewMessagesData } =  useFetchUserChats()
 const [ messages, setMessages ] = useState([])
 const [ typingMessage, setTypingMessage ] = useState("")
 const { socket } = useSocket()

 const sendMessageFunc = () => {
     let message = {
         chatId: selectedChat._id,
         sender: userData.id,
         text: typingMessage
     }
     socket.emit("send-message", {
        ...message,
        members: selectedChat.members.map( m => m._id),
        read:false
     })
   handleSendNewMessage(message)
 }

  useEffect(() => {
    socket.off("receive-message").on("receive-message", (data) => {
       setMessages(prevMessages => {
        return [...prevMessages, data]
      })
    })
  }, [])

  const getMessagesFunc = () => {
    handleGetMessages(selectedChat?._id)
 }

 useEffect(()=>{
   selectedChat?._id && getMessagesFunc()
 }, [selectedChat?._id])

 // Initialize messages when data is fetched
  useEffect(() => {
    if (getNewMessagesData) {
      setMessages(getNewMessagesData?.data)
    }
  }, [getNewMessagesData])



  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
         {selectedChat && selectedChat.avatar}
        </div>
        <div className="flex-1">
          <h2 className="font-medium text-gray-800">{selectedChat && selectedChat.username}</h2>
          <p className="text-sm text-gray-600">{selectedChat && selectedChat.role}</p>
        </div>
      </div>

      {/* Messages */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
    {messages?.map((message) => {
     const currentUserIsSender = message.sender === userData.id
      return (
     <div
       key={message.id}
       className={`flex ${ currentUserIsSender ? 'justify-end' : 'justify-start'}`}
     >
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
        currentUserIsSender
          ?  'bg-blue-600 text-white'
          : 'bg-white text-gray-800 border border-gray-200'
      }`}>
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
 })}
        
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={typingMessage}
            onChange={(e) => setTypingMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={sendMessageFunc}
            disabled={!typingMessage.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;