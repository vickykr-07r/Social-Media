import mongoose from "mongoose"

let UserSchema= new mongoose.Schema({
    name:{
     type:String,
     required:true
    },

    username:{
    type:String,
    required:true,
    unique:true
    },

    email:{
    type:String,
    required:true,
    unique:true
    },

    password:{
    type:String,
    required:true,
    },

    profileimage:{
    type:String,
    },

    followers:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

    following:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

    resetotp:{
        type:String
    },

    otpExpires:{
        type:Date
    },

    isotpvalid:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

 export let User = mongoose.model("User",UserSchema) 