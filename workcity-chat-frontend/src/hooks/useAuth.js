import { setCredentials } from "../features/authslice/authslice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useAddRoleMutation, useLoginMutation, useRegisterUserMutation } from "../features/authslice/authApi";
import { useNavigate } from "react-router-dom";

function useLoginUser() {
  const [ loginUser, { isLoading: loginIsLoading, data:loginData } ] = useLoginMutation();
  const [ registerUser, { isLoading: registerIsLoading } ] = useRegisterUserMutation();
  const [ addRole, { isLoading: addRoleIsLoading, data:addRoleData }] = useAddRoleMutation()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLoginUser = async (info) => {
  if(!info.username && info.password){
   toast.error("Both fields are required")
   return;  
  }
    try {
      const data = await loginUser(info).unwrap();
      navigate("/dashboard")
      localStorage.setItem('userDetails', JSON.stringify(data)) 
      toast.success(`Welcome back ${info?.username}`)
 } catch (error) {
  if (error.originalStatus === 401 ) {
    toast.error("Invalid credentials");
  } else if(error.status === 403 && error.data?.message === "Access denied. No role assigned to user."){
      navigate("/selectrole");
      localStorage.setItem("name", info?.username)
  } else {
    toast.error(error.data?.message || "An error occurred");
  }
}}

 const handleRegisterUser = async (info) => {
  if(!info.email){
   toast.error("Please provide a valid email")
   return;  
  }
    try {
      await registerUser(info).unwrap();
      navigate("/")
      toast.success("Your account was created successfully pls login and set up your account.")
    } catch (error) {
      console.log("registration failed:", error);
      toast.error(error.data || "An error occoured")
    }
}

const handleRoleAddition = async (role) => {
  if(!role){
   toast.error("Please select a role")
   return;  
  }
    try {
      const data = await addRole(role).unwrap();
      navigate("/dashboard")
      localStorage.setItem('userDetails', JSON.stringify(data)) 
      toast.success(`Welcome back ${data?.username}`)
      console.log(data)
    } catch (error) {
      console.log("Adding user role failed failed:", error);
      toast.error(error?.message || "An error occoured")
    }
}


  useEffect(()=>{
    if(loginData){
     dispatch(setCredentials(loginData))
    }else if(addRoleData){
     dispatch(setCredentials(addRoleData))
    }
  }, [loginData, addRoleData])


return { loginIsLoading, handleLoginUser, registerIsLoading, handleRegisterUser, addRoleIsLoading, handleRoleAddition}
}

export default useLoginUser;