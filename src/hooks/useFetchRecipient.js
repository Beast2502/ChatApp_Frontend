import { useEffect ,useState } from "react";
import { baseUrl, getRequest } from "../utils/services";


export const useFetchRecipientUser =(chat,user) =>{
    const [recipientUser,setRecipientUser] = useState(null);
    const [error,setError] = useState();

    const recipientId = chat?.members.find((id)=> id!== user?._id);

    useEffect(()=>{
        const getUser = async()=>{
           if(!recipientId) return null;
           const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

           console.log(error,"Error")
           if(response?.error){
            return setError(error);
           } 

           setRecipientUser(response);
            
        }

        getUser();
    },[recipientId]);

    return {recipientUser,error}

}