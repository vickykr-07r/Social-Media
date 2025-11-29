import { User } from "../Models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sendmail from "../Config/Mail.js";
export let Signup =async(req,res)=>{
try {
    let{name,username,email,password}=req.body;
    let emailexist= await User.findOne({email})
    let usernamexist= await User.findOne({username})
    if(usernamexist){
        return res.status(400).json({
            message:"username already exist"
        })
    }
    if(emailexist){
        return res.status(400).json({
            message:"user already exist"
        })
    }
    let hassedPassword = await bcrypt.hash(password,10)
    let newUser= await User.create({
        name,
        username,
        email,
        password:hassedPassword
    })

    let token = jwt.sign(
        {id:newUser._id},
        process.env.SECRET_KEY,
        {expiresIn:"7d"}
    )

    res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000  
    });

    return res.status(201).json({
        message:"signup successful",
        user:newUser
    })
} catch (error) {
    return res.status(500).json({
        message:`error on signup ${error}`
    })
}
}

export let Login =async(req,res)=>{
try {
    let{username,password}=req.body;
    let usernamexist= await User.findOne({username})
    if(!usernamexist){
        return res.status(400).json({
            message:"Signup first"
        })
    }

    let comparePassword = await bcrypt.compare(password,usernamexist.password)
    
    if(!comparePassword){
        return res.status(400).json({
            message:"you entered wrong password or email"
        })
    }


    let token = jwt.sign(
        {id:usernamexist._id},
        process.env.SECRET_KEY,
        {expiresIn:"7d"}
    )

    res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000   
    });
    
    usernamexist.password = undefined;

    return res.status(200).json({
        message:"Login successful",
        user:usernamexist
    })
} catch (error) {
    return res.status(500).json({
        message:`error on Login ${error}`
    })
}
}

export let Logout = (req, res) => {
  try {
    res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: true
  });

  return res.status(200).json({
    message: "Logout successful"
  });
  } catch (error) {
    return res.status(500).json({
        message:`error on logout ${error}`
    })
  }
};

export const sendotp = async (req, res) => {
    try {
        let { email } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "user not found"
            });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        user.resetotp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000; 
        user.isotpvalid = false; 

        await user.save(); 

        sendmail(email, otp);

        return res.status(200).json({
            message: "email sent successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: `send otp error: ${error}`
        })
    }
};


export const verifyotp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

       
        if (user.resetotp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({
                message: "OTP Expired"
            });
        }

        
        user.resetotp = undefined;
        user.otpExpires = undefined;
        user.isotpvalid = true;

        await user.save();  

        return res.status(200).json({
            message: "OTP Verified Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: `verify otp error ${error}`
        });
    }
};


export const resetpassword = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        if (!user.isotpvalid) {
            return res.status(400).json({
                message: "OTP verification required"
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

      
        user.isotpvalid = false;
        user.resetotp = undefined;
        user.otpExpires = undefined;

        await user.save();

        return res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: `resetpassword error ${error}`
        });
    }
};




