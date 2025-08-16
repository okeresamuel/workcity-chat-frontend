import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";

function useSocket() {
const userData = useSelector(state => state.AuthSlice.userDetails);
const socket = io("http://localhost:3001/")
useEffect(()=>{
  if(userData){
   socket.emit("join-room",  userData.id)
   
  }
}, [])
 
 return { socket };
}

export default useSocket