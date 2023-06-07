import mongoose, { Schema,Document } from 'mongoose'


interface IToken extends Document{
    userId:Schema.Types.ObjectId;
    token:string,
    createdAt:Date;
}


const tokenShema=new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user',
        unique:true,
    },
    token:{
        type:String,
        required:true,

    },
    creaatedAt:{
        type:Date,
        default:Date.now(),expires:3600
    }
})

const tokenModel=mongoose.model<IToken>('token',tokenShema);
export default tokenModel;