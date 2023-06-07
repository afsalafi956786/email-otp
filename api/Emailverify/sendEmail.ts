import nodemailer from 'nodemailer'

export const emailSend=async(email:string,subject:string,text:string)=>{
        try{
            console.log('function work')
            const transporter=nodemailer.createTransport({
                host:process.env.HOST,
                service:process.env.SERVICE,
                port:Number(process.env.EMAIL_PORT),
                secure:Boolean(process.env.SECURE),
                auth:{
                    user:process.env.USER,
                    pass:process.env.PASS
                }
            })
            await transporter.sendMail({
                from:process.env.USER,
                to:email,
                subject:subject,
                text:text
            })
            console.log('Email sent Successfully')

        }catch(error:any){
            console.log('Email is not sent')
            console.log(error.message)
        }
}