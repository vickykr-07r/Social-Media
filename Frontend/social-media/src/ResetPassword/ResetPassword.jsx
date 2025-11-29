import { useState } from "react"
import Style from "../ResetPassword/ResetPassword.module.css"
import axios from "axios";
import { useContext } from "react";
import { ServerurlContext } from "../Context/Serverurl";
function ResetPassword(){
    
    let{serverurl}=useContext(ServerurlContext)
    const [Step,setStep]=useState(1)
    const [email,setEmail]=useState("");
    const [otp,setOtp]=useState("");
    const [newpassword,setNewpassword]=useState("");
    const [confirmpassword,setConfirmpassword]=useState("");
    
    const handlestep1 =async()=>{
        try {
        let result =await axios.post(`${serverurl}/api/auth/sendotp`,{email },{withCredentials:true})
        console.log(result)
        setStep(2)
        } catch (error) {
        console.log(`frontend error on sendotp ${error}`)
        }
    }

     const handlestep2 =async()=>{
        try {
        let result =await axios.post(`${serverurl}/api/auth/verifyotp`,{email,otp},{withCredentials:true})
        console.log(result)
        setStep(3)
        } catch (error) {
        console.log(`frontend error on verifyotp ${error}`)
        }
    }

     const handlestep3 =async()=>{
        if(newpassword !=confirmpassword){
            alert("both password doesn't match")
            return;
        }
        try {
        let result =await axios.post(`${serverurl}/api/auth/resetpassword`,{ email, password: newpassword },{withCredentials:true})
        console.log(result)
        } catch (error) {
        console.log(`frontend error on resetpassword ${error}`)
        }
    }

    return(
        <>
        <div className={Style.Container}>

        <div className={Style.box}>

        {Step===1 && 
        <div className={Style.div}>
        <div className={Style.heading}>
        <h1>Enter Email</h1>
        </div>
        <input type="email" placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <button onClick={handlestep1}>Send OTP</button>
        </div>
        }


        {Step===2 && 
        <div className={Style.div}>
        <div className={Style.heading}>
        <h1>Enter OTP</h1>
        </div>
        <input type="number" placeholder="enter OTP" value={otp} onChange={(e)=>setOtp(e.target.value)} />
        <button onClick={handlestep2}>verify OTP</button>
       </div>
        }


        {Step===3 && 
        <div className={Style.div}>
        <div className={Style.heading}>
        <h1>Change Password</h1>
        </div>
        <input type="password" placeholder="enter new password" value={newpassword} onChange={(e)=>setNewpassword(e.target.value)} />
        <input type="password" placeholder="enter confirm password" value={confirmpassword} onChange={(e)=>setConfirmpassword(e.target.value)} />
        <button onClick={handlestep3}>Change Password</button>
        </div>
        }
        
        </div>
        </div>
        </>
    )
}

export default ResetPassword