import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ServerurlContext } from "../Context/Serverurl";
import { useDispatch } from "react-redux";
import { setOtherUserData } from "../Redux/userslice";

function Getsuggesteduser() {
  const { serverurl } = useContext(ServerurlContext);
   let dispatch=useDispatch()

  useEffect(() => {
    const getOtherUser = async () => {
      try {
        const result = await axios.get(
          `${serverurl}/api/user/otheruser`,
          { withCredentials: true }
        );
       dispatch(setOtherUserData(result.data)) 
        // console.log(result.data);    
      } catch (error) {
        console.log(`frontend other user error ${error}`);
      }
    };

    getOtherUser();
  }, [serverurl]);

  return (
    <>
    </>
  );
}

export default Getsuggesteduser;
