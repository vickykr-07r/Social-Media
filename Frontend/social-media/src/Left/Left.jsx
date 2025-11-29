import axios from "axios";
import Style from "../Left/Left.module.css";
import { useContext } from "react";
import { ServerurlContext } from "../Context/Serverurl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../Redux/userslice";
import Otherfollowers from "./otherfollowers";
import Feed from "../Feed/Feed.jsx";
function Left() {
  const { serverurl } = useContext(ServerurlContext);
  const { userData,otherUserData } = useSelector((state) => state.user);
  // console.log(otherUserData)
  const dispatch=useDispatch()
  const navigate = useNavigate();
 
  async function logout() {
    try {
      let result=await axios.get(`${serverurl}/api/auth/logout`, {
        withCredentials: true,
      });
      console.log(result.data)
      dispatch(setUserData(null))
      navigate("/login");
      
    } catch (error) {
      console.log(`error on logout ${error}`);
    }
  }

  return (
    <div className={Style.container}>
      <div className={Style.box}>
        <div className={Style.userdetail}>
          <div className={Style.userdp}></div>

          <div className={Style.username}>
            <h2>{userData.username}</h2><br />
            <h2>{userData.name}</h2>
          </div>

          <div className={Style.logoutbutton}>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
        <Otherfollowers/>
      </div>
    </div>
  );
}

export default Left;
