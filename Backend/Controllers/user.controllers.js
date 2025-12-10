import { User } from "../Models/user.model.js";
import { isAuth } from "../Middlewares/isAuth.Middlewares.js";
import uploadoncloudinary from "../Config/cloudinary.js";

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password").populate("posts"); 

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({
      message: `Error on getting current user: ${error.message}`
    });
  }
};

export const otheruser = async (req, res) => {
  try {
    let users = await User.find({_id: { $ne: req.userId }}).select("-password");

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "Other users not found",
      });
    }

    return res.status(200).json(users);

  } catch (error) {
    return res.status(500).json({
      message: `Other user fetch error: ${error}`,
    });
  }
};

export const editprofile=async(req,res)=>{
try {
  const{name,username,bio,profession,gender}=req.body;
  const user=await User.findById(req.userId).select("-password")
  if(!user){
    return res.status(400).json({
      message:"user not found"
    })
  }
  const sameuserwithusername=await User.findOne({username})
  if(sameuserwithusername && sameuserwithusername._id.toString() !== req.userId){
    return res.status(400).json({
      message:"username already exist"
    })
  }
  let profileimage;
  if(req.file)
  {
    profileimage=await uploadoncloudinary(req.file.path)
  }
  user.name=name;
  user.username=username;
  user.bio=bio;
  user.profession=profession;
  user.gender=gender;
  
   if (profileimage) {
      user.profileimage = profileimage;
    }

  await user.save();

  return res.status(200).json(user)
} catch (error) {
  return res.status(500).json({
      message:`error on editprofile backend ${error}`
    })
}
};

export const profile = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: `Error fetching profile: ${error.message}`,
    });
  }
};



