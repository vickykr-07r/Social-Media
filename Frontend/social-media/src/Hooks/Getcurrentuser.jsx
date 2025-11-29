import { useContext, useEffect } from "react";
import { ServerurlContext } from "../Context/Serverurl";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/userslice";
export function Getcurrentuser(){
  let dispatch=useDispatch((state)=>state.user)
    let {serverurl}=useContext(ServerurlContext)
    useEffect(()=>{
     const fetchuser=async()=>{
      try {
        let result= await axios.get(`${serverurl}/api/user/current`,{withCredentials:true})
        // console.log(result.data)
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log(`get current user data error on frontend ${error}`)
      }
     }
     fetchuser();
    },[])
    return(
    <>
    </>)
}
