import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req,res,next) => {
    try{
        const decision = await aj.protect(req, { requested: 1 })

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({message:"rate limit exceeded. please try again later"})
            }else if(decision.reason.isBot()){
                return res.status(403).json({message:"Bot access denied"})
            }else {
                return res.status(403).json({message:"access denied by security policy"})
            }
        }
        next();
    }catch (error){
        console.log("arcjet protection error" , error);
        next();
    }
}