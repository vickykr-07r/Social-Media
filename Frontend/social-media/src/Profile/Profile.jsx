import axios from "axios";
import Style from "../Profile/Profile.module.css";
import { useContext, useEffect } from "react";
import { ServerurlContext } from "../Context/Serverurl";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../Redux/userslice"; 
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaHome, FaSearch } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa6";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import dp from "../assets/OIP.webp"

function Profile() {
  const { username } = useParams();
  const {serverurl} = useContext(ServerurlContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData, profileData } = useSelector((state) => state.user);
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

  async function handlelogout() {
    try {
      await axios.get(`${serverurl}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      navigate("/login");
    } catch (error) {
      console.log(`error on logout ${error}`);
    }
  }

  return (
    <>
    <div className={Style.container}>

      <div className={Style.nav}>
        <div className={Style.arroe} onClick={()=>{navigate("/")}}>
          <IoMdArrowRoundBack />
        </div>

        <div className={Style.name}>
          {profileData?.username || "Loading..."}
        </div>

        <div className={Style.logout} onClick={handlelogout}>
          <button>Logout</button>
        </div>
      </div>

      
      <div className={Style.bioimage}>
        <div className={Style.bioimageleft}>
          <img
            src={profileData?.profileimage || dp}
            alt="profile"
          />
        </div>

        <div className={Style.bioimageright}>
          <span>{profileData?.name}</span>
          <span>{profileData?.bio}</span>
        </div>
      </div>

      <div className={Style.countfollowing}>
        <div className={Style.posts}>
          <h1>0</h1>
          <p>Posts</p>
        </div>

        <div className={Style.followers}>
          <h1>{profileData?.followers?.length || 0}</h1>
          <p>Followers</p>
        </div>

        <div className={Style.following}>
          <h1>{profileData?.following?.length || 0}</h1>
          <p>Following</p>
        </div>
      </div>

     {userData?._id === profileData?._id && (
  <div className={Style.editprofile}>
    <button onClick={()=>{navigate("/editprofile")}}>Edit Profile</button>
  </div>
   )}

   {userData?._id != profileData?._id && (
  <div className={Style.editprofile}>
    <button>Follow</button>
    <button>Message</button>
  </div>
   )}

      <div className={Style.footer}>
        <FaHome onClick={()=>{navigate("/")}}/>
        <FaSearch />
        <FaFolderPlus />
        <MdOutlineSlowMotionVideo />
        <img src={userData?.profileimage || dp} alt="user dp" />
      </div>

    </div>
    </>
  );
}

export default Profile;
