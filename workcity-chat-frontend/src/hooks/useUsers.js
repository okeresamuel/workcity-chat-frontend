import { useEffect } from "react";
import { useFetchUserByRoleMutation} from "../features/usersslice/userApi";
import toast from "react-hot-toast";

function useFetchUserByRole() {
  const [ fetchUsers, { isLoading: usersIsLoading, data:users, error: fetchUserError } ] = useFetchUserByRoleMutation();
  const handleFetchUsers = async (role) => {
  if(!role){
   toast.error("User Role is required")
   return;  
  }
  await fetchUsers(role)
}
 
return { 
    usersIsLoading, 
    users, 
    fetchUserError, 
    handleFetchUsers, 
}

}

export default useFetchUserByRole;