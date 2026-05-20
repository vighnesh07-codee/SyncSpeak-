import { generateToken } from "../lib/utils.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs"

export const signup = async (req,res) => {
    const { fullname, fullName, email, password } = req.body
    const resolvedFullName = fullname || fullName

    try{
        if(!resolvedFullName || !email || !password){
            return res.status(400).json({message:"all filds are required"})
        }
        
        if(password.length < 6){
            return res.status(400).json({message:"password must be greter than 6 charachter"})
        }

        // email vallid : regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
              return res.status(400).json({message:"invalid email_id"})
        
        }

        // const user
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message:"email is alredy exist"})

        //bcrypt password
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullname: resolvedFullName,
            email,
            password:hashpassword
        })

       if(newUser){
        generateToken(newUser._id, res)
        await newUser.save()

        res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            email:newUser.email,
             profilepic:newUser.profilepic,
        })
       } 
    }catch (error){
        console.error("error is signup controller  : ", error)
        res.status(500).json({message:"internal server error"})
    }
}
export const login = (req,res) => {
    const {email , password} = req.body
}
export const logout = (req,res) => {
    const { email , password} = req.body
}

export const forgot = (req,res) => {
    res.send("update endpoint")
}