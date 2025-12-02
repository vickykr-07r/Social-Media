import axios from "axios";
import { useContext, useEffect } from "react";
import Serverurl from "../Context/Serverurl";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../Redux/userslice";
function Profile() {
  const { username } = useParams();
  const  serverurl = useContext(Serverurl);

  const dispatch = useDispatch();
  const {profileData} = useSelector(state => state.user);

  useEffect(() => {
    const handleProfile = async () => {
      try {
        const result = await axios.get(`${serverurl}/api/user/profile/${username}`,{ withCredentials: true });
        dispatch(setProfileData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    handleProfile();
  }, [username]);

  return (
    <>
      <h1>Profile Page</h1>
      
    </>
  );
}

export default Profile;
