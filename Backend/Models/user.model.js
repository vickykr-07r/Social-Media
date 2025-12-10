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
    
    bio:{
    type:String,
    },

    profession:{
    type:String,
    },
    
    gender:{
    type:String,
    enum:["male","female"]
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

    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
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