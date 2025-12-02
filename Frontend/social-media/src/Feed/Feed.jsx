import Style from "../Feed/Feed.module.css"
import Story from "../Story/Story";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa6";
import { MdDisplaySettings, MdOutlineSlowMotionVideo } from "react-icons/md";
import { useSelector } from "react-redux";
import dpimage from "../assets/OIP.webp"
import { useNavigate } from "react-router-dom";
function Feed(){
    const {userData} = useSelector(state=>state.user)
    const navigate=useNavigate()
    function navigatee(){
        navigate("/profile")
    }
    return(
    <>
    <div className={Style.container}>
        <div className={Style.storyRow}>
         <Story name="vicky"/> 
         <Story name="vicky"/> 
         <Story name="vicky"/> 
         <Story name="vicky"/> 
         <Story name="vicky"/> 
         <Story name="vicky"/> 
         <Story name="vicky"/> 
         <Story name="vicky"/>
        </div>
        <div className={Style.footer}>
         <FaHome />
         <FaSearch />
         <FaFolderPlus />
         <MdOutlineSlowMotionVideo />
         <img src={userData.profileimage || dpimage} alt="" onClick={navigatee}/>
        </div>
    </div>
    </>)
}
export default Feed;