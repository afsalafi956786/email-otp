import mongoose, { mongo } from "mongoose";
import { Document } from "mongoose";

interface User extends Document{
   name:string,
   email:string,
   password:string,
   mobile:number,
   isEmailVerified:boolean,
}


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
    },
    photo:{
        type:String,
        required:true,
    },
    isEmailVerified:{
        type:Boolean,
        default:false,
    }


},{
    timestamps:true,
})

const userModel=mongoose.model<User>('user',userSchema);
export default userModel;