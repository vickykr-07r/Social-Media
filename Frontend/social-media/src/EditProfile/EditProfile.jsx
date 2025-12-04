import { IoMdArrowRoundBack } from "react-icons/io";
import Style from "../EditProfile/EditProfile.module.css"
import dp from "../assets/OIP.webp"
import { useSelector } from "react-redux";
function EditProfile(){
    const {userData}=useSelector(state=>state.user)
    return(
        <>
      <div className={Style.container}>

      <div className={Style.nav}>
        <div className={Style.arroe} onClick={()=>{navigate("/")}}>
        <IoMdArrowRoundBack />
        </div>
      </div>

     <div className={Style.image}>
      <img src={dp} alt="" />
      <a href="">Change your profile image</a>
     </div>

     <div className={Style.form}>
     <input type="text" placeholder={userData?.name} readOnly className={Style.a}/>
     <input type="text" placeholder={userData?.username} readOnly className={Style.a}/>
     <input type="text" placeholder="Bio"/>
     <input type="text" placeholder="Profession"/>
     <input type="text" placeholder="Gender"/>
     <button>Save Profile</button>
     </div>


      </div>
        </>
    )
}

export default EditProfile; 