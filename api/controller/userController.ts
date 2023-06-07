import { Request,Response } from 'express';
import fs from 'fs'
import userModel from '../model/userSchema';
import bcrypt from 'bcrypt';
import { otpCall } from '../otp/userOtp';
import { otpVerify } from '../otp/userOtp';
import Token from '../model/tokenShema'
import { emailSend } from '../Emailverify/sendEmail';
import crypto from 'crypto'
import jwt from 'jsonwebtoken'


 export const secretKey='secretbyafsal';

export async function userRegister(req:Request,res:Response){
    try{
    let obj =req.body;
   if(req.file && obj){
       const { path,originalname }=req.file as Express.Multer.File;
       const parts=originalname.split('.');
       const ext=parts[parts.length-1];
       const newPath=path + '.' + ext;
       fs.renameSync(path,newPath);
       const uploadFile=newPath;

    //    let regMob=/^[6789]\d{9}$/;
    //    if(regMob.test(obj.phone)){
          let existEmail=await userModel.findOne({email:obj.email});
          if(!existEmail){
            let  userDetails=obj;
            if(userDetails.password == userDetails.confirmPass){
           const  existPhone=await userModel.findOne({phone:obj.phone});
           if(!existPhone){
             let phoneNum=userDetails.phone;
              const phoneNumber=parseInt(phoneNum)
              otpCall(phoneNumber);
               let user={
                name:userDetails.name,
                email:userDetails.email,
                password:userDetails.password,
                photo:uploadFile,
                phone:phoneNumber
               }
             res.json({status:'success','message':'Details submitted ',user})

           }else{
            res.json({status:'failed','message':'This number is already taken!!'})
           }
              

            }else{
                res.json({status:'failed',message:'password is not matched!!'})
            }
             
                
          }else{
             res.json({status:'failed',message:'This Email is already registered!!'})
          }
    //    }else{
    //     res.json({status:'failed',message:'phone number should be 10 number and start with 6789'})
    //    }   
   }else{
    res.json({ status: "failed", message: "All fields are required !" });

   }
    }catch(error:any){
        console.log(error.message)
    }

}

export async function userOtpverify(req:Request,res:Response){
    try{

    let {otp,users}=req.body;
     if(otp && users){
        let mobile=users.phone
      let otpStatus= await otpVerify(mobile,otp);
      if(typeof otpStatus !== 'undefined' && otpStatus !== null && (otpStatus as { valid: boolean }).valid){
         users.password=await bcrypt.hash(users.password,10)
         const user=await userModel.create(users);
              
         //email send token
           const token=await new Token({
                userId:user._id,
                token:crypto.randomBytes(32).toString('hex')
              }).save();
              const url=`http://localhost:5173/users/${user._id}/verify/${token.token}`
              await emailSend(user.email,'verify Email',url)
            

         let userId=user._id;
         let jwtToken=jwt.sign({userId},secretKey,{expiresIn:'2h'});
         res.json({status:'success','message':'signup success',user,jwtToken})
         
      }else{
        res.json({status:'failed','message':'Invalid Otp'})
      }

     }else{
        res.json({status:'failed','message':'please Enter your otp'})
     }

    }catch(error:any){
        console.log(error.message)
    }

}

export async function emailVerify(req:Request,res:Response){
    try{
        const user=await userModel.findOne({_id:req.params.id});
        if(!user) return res.json({status:'failed','message':'Invalid link!!'})
        
        const token=await Token.findOne({
            userId:user._id,
            token:req.params.token
        })
        if(!token) return res.json({status:'failed','message':'Invalid link!!'})
        await userModel.updateOne({id:user._id,isEmailVerified:true});
        await token.deleteOne({_id:token._id});
        res.json({status:'success','message':'your Email is successfully verified'})
    }catch(error:any){
        console.log(error.message)
    }

}

export async function userData(req:Request,res:Response){
    try{
     const data=await userModel.findById((req as any).userId);
     console.log(data)
     res.json({data,auth:true});
    }catch(error:any){
        console.log(error.message)
    }
}

export async function userLogin(req:Request,res:Response){
    const {email,password}=req.body;
    if(email && password){
        let existUser=await userModel.findOne({email:email})
        if(existUser){
            const isMatch=await bcrypt.compare(password,existUser.password);
            if(isMatch){
                const userId=existUser._id
                const token=jwt.sign({userId},secretKey,{expiresIn:'2h'});
                res.json({status:'success','message':'Login successfull',token})

            }else{
                res.json({status:'failed','message':'Incorrect password!!'})
            }

        }else{
            res.json({status:'failed','message':'This Email is not registered!!'})
        }

    }else{
        res.json({status:'failed','message':'All fields are required!!'})
    }
}