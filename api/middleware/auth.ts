import jwt from 'jsonwebtoken';
import { secretKey } from '../controller/userController';
import { NextFunction, Request,Response } from 'express';


export function userAuthentication(req:Request,res:Response,next:NextFunction){
    try{
        let token=req.headers['usertoken'] as string;
        if(token){
            jwt.verify(token,secretKey,(err,decoded:any)=>{
                if(err){
                    res.json({status:'failed','message':'user not authenticated'})
                }else{
                    (req as any).userId=decoded.userId;
                    next()
                }
            })
        }else{
            res.json({'status':'failed','message':"usernot finded"})
        }

    }catch(error:any){
        console.log(error.message)
    }
}