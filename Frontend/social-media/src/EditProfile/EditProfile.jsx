import { IoMdArrowRoundBack } from "react-icons/io";
import Style from "../EditProfile/EditProfile.module.css"
import dp from "../assets/OIP.webp"
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useContext } from "react";
import { ServerurlContext } from "../Context/Serverurl";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/userslice";
function EditProfile(){
    const {userData}=useSelector(state=>state.user)
    let{serverurl}=useContext(ServerurlContext)
   
    let[forrmData,setFormData]=useState({
      name:"",
      username:"",
      bio:"",
      profession:"",
      gender:""
    })
    let navigate=useNavigate();
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
    const dispatch =useDispatch()
    async function handlesubmit(){
       const formData = new FormData();
       formData.append("bio",forrmData.bio);
       formData.append("profession",forrmData.profession);
       formData.append("gender",forrmData.gender);
       formData.append("profileimage",image)
       formData.append("name",forrmData.name)
       formData.append("username",forrmData.username)
      try {
        let result =await axios.post(`${serverurl}/api/user/editprofile`,formData,{withCredentials:true})
        console.log(result.data)
        navigate("/")
        dispatch(setUserData(result.data))
        setFormData({...forrmData,
          name:"",
          username:"",
          bio:"",
          profession:"",
          gender:""
        })
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
     <input type="text" placeholder={userData?.name}  value={forrmData.name} onChange={handleinpt} name="name"/>
     <input type="text" placeholder={userData?.username}   value={forrmData.username} onChange={handleinpt} name="username"/>
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