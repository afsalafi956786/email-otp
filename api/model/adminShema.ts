
import mongoose, { mongo } from "mongoose";
import { Document } from "mongoose";

interface Admin extends Document{
    email:string,
    password:string,
}

const adminShema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
})

const adminModel=mongoose.model<Admin>('admin',adminShema);
export default adminModel;