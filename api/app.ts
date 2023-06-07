import express from 'express';
import dotenv from 'dotenv';
import connectDb from './connection/dbConnect';
import userRouter from './Routes/userRouter';
import adminRouter from './Routes/adminRouter'
import cors from 'cors'
dotenv.config();
import * as path from 'path';
const app:express.Application=express();





let data_base=process.env.DATABASE_CONNECTION;
if(data_base !==undefined){
    connectDb(data_base)
}

app.use('/uploads',express.static(path.join(__dirname ,'/uploads')));


app.use(express.json());
app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:5173',
    })
  );

  app.use('/',userRouter);
  app.use('/admin',adminRouter)




app.listen(4000,()=>{
    console.log(`server is connected to the port is 4000`)
})