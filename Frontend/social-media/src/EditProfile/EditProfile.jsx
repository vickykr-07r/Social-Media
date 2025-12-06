import { IoMdArrowRoundBack } from "react-icons/io";
import Style from "../EditProfile/EditProfile.module.css"
import dp from "../assets/OIP.webp"
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useContext } from "react";
import { ServerurlContext } from "../Context/Serverurl";
import axios from "axios"
function EditProfile(){
    const {userData}=useSelector(state=>state.user)
    let{serverurl}=useContext(ServerurlContext)
    let[formData,setFormData]=useState({
      bio:"",
      profession:"",
      gender:""
    })
    let[image,setImage]=useState(null)
    let[preimage,setpreImage]=useState(null)
    function handleinpt(event){
     setFormData({...formData,[event.target.name]:event.target.value})
    }
    function handleimage(){
      
    }
    const ref=useRef();
    async function handlesubmit(){
       const formData = new FormData();
       formData.append("bio",bio);
       formData.append("profession",profession);
       formData.append("gender",gender);
      try {
        let result =await axios.post(`${serverurl}/api/user/editprofile`,formData,{withCredentials:true})
      } catch (error) {
        console.log(error)
      }
    }
    return(
        <>
      <div className={Style.container}>
     <input type="file" hidden ref={ref} onChange={handleimage}/>
      <div className={Style.nav}>
        <div className={Style.arroe} onClick={()=>{navigate("/")}}>
        <IoMdArrowRoundBack />
        </div>
      </div>

     <div className={Style.image} onClick={ref.current.click()}>
      <img src={image? image : dp} alt="" />
      <a href="">Change your profile image</a>
     </div>

     <div className={Style.form}>
     <input type="text" placeholder={userData?.name} readOnly className={Style.a} />
     <input type="text" placeholder={userData?.username} readOnly className={Style.a} />
     <input type="text" placeholder="Bio" value={bio} onChange={handleinpt} name="bio"/>
     <input type="text" placeholder="Profession" value={profession} onChange={handleinpt} name="profession"/>
     <input type="text" placeholder="Gender" value={gender} onChange={handleinpt} name="gender"/>
     <button onClick={handlesubmit}>Save Profile</button>
     </div>


      </div>
        </>
    )
}

export default EditProfile; 