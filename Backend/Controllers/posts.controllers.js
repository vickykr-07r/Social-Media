import uploadoncloudinary from "../Config/cloudinary";
import { Post } from "../Models/post.model.js";
import { User } from "../Models/user.model.js";

const uploadposts=async(req,res)=>{
try {
    const {caption,mediaType}=req.body;
    let media;
    if(req.file){
        media=await uploadoncloudinary(req.file.path)
    }else{
        return res.status(400).json({
            message:"error on media"
        })
    }
    const post =await Post.create({
        caption,mediaType,media,author:req.userId
    })
    const user = await User.findById(req.userId)
    user.posts.push(post._id);
    user.save()
    const populatedpost=await Post.findById(post._id).populate("author","name username profileimage")
     return res.status(200).json(populatedpost)

} catch (error) {
    return res.status(500).json({
        message:`error on backed uploadpost ${error}`
    })
}
};

const getAllPosts=async(req,res)=>{
try {
    const posts=await Post.find({author:req.userId}).populate("author","name username profileimage")
    return res.status(200).json(posts)
} catch (error) {
    return res.status(500).json({
        message:`error on backed getallposts ${error}`
    })
}
}