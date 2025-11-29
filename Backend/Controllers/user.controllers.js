import { User } from "../Models/user.model.js";
import { isAuth } from "../Middlewares/isAuth.Middlewares.js";
export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); 

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

