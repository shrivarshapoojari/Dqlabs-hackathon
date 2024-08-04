import jwt from 'jsonwebtoken'

import AppError from "../utils/appError.js";

export const isLoggedIn= async (req,res,next)=>{

    const {token}=req.cookies;
   
    
    if(!token)
    {
   return next(new AppError('Unauthorised,Plz Login',401))
    } 
    const tokenDetails=jwt.verify(token,process.env.JWT_SECRET)
    if(!tokenDetails)
    {
        return next(new AppError('token may xpired',401))
    }
    req.user=tokenDetails;
    next();

}
  export const authorizedRoles=(...roles)=>(req,res,next)=>{
   const currentRole=req.user.role;
   if(!roles.includes(currentRole))
   {
    return next(new AppError("You Dont have access",403))
   }

    next();
  }


  export const authorizedSubscriber=async(req,res,next)=>{
   const subscriptionStatus=req.user.subscription.status;

   const currentRole=req.user.role;
   if(currentRole!=='ADMIN'  && subscriptionStatus !=='active')
   {
       return next(new AppError('PLz subscribe',403))
   }
   
    next();
  }