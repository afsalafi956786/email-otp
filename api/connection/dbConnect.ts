import mongoose from "mongoose";


async function connectDb(data:string){
    try{
        mongoose.connect(data,{dbName:'userList'});
        console.log('database connected successfully..')

    }catch(error:any){
        console.log(error.message)
    }

}

export default connectDb