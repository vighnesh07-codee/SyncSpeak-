import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    fullname:{
        type: String,
        require: true,
    },
      email:{
        type: String,
        require: true,
        unique:true
    },
        password:{
        type: String,
        require: true,
        unique:true,
        minlength:6
    },
    profilepic:{
        type:String,
        default:""
    }
},
    {timestamps:true} //createdd & updated
)

export const User = mongoose.model("user",userSchema);