import { IoMdArrowRoundBack } from "react-icons/io";
import Style from "../EditProfile/EditProfile.module.css"
import dp from "../assets/OIP.webp"
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useContext } from "react";
import { ServerurlContext } from "../Context/Serverurl";
import axios from "axios"
import { useNavigate } from "react-router-dom";

function EditProfile(){
    const {userData}=useSelector(state=>state.user)
    let{serverurl}=useContext(ServerurlContext)
    console.log(serverurl)
    let[forrmData,setFormData]=useState({
      bio:"",
      profession:"",
      gender:""
    })
    let[image,setImage]=useState(null)
    let[preimage,setpreImage]=useState(null)
    function handleinpt(event){
     setFormData({...forrmData,[event.target.name]:event.target.value})
    }
    function handleimage(event) {
  const file = event.target.files[0];

  if (file) {
    setImage(file);  
    setpreImage(URL.createObjectURL(file)); 
  }
}

    const ref=useRef();
    async function handlesubmit(){
       const formData = new FormData();
       formData.append("bio",forrmData.bio);
       formData.append("profession",forrmData.profession);
       formData.append("gender",forrmData.gender);
       formData.append("profileimage",image)
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

     <div className={Style.image} onClick={()=>{ref.current.click()}}>
      <img src={preimage? preimage : dp} alt="" />
      <a href="#">Change your profile image</a>
     </div>

     <div className={Style.form}>
     <input type="text" placeholder={userData?.name} readOnly className={Style.a} />
     <input type="text" placeholder={userData?.username} readOnly className={Style.a} />
     <input type="text" placeholder="Bio" value={forrmData.bio} onChange={handleinpt} name="bio"/>
     <input type="text" placeholder="Profession" value={forrmData.profession} onChange={handleinpt} name="profession"/>
     <input type="text" placeholder="Gender" value={forrmData.gender} onChange={handleinpt} name="gender"/>
     <button onClick={handlesubmit}>Save Profile</button>
     </div>


      </div>
        </>
    )
}

export default EditProfile; 