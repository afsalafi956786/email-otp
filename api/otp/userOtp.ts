
import dotenv from  'dotenv';

dotenv.config()

const accountId=process.env.ACCOUNTID
const authtoken=process.env.AUTHTOKEN
const serviceId=process.env.SERVICEID

const client =require('twilio')(accountId,authtoken);

export const otpCall=(phone:number)=>{
     client.verify.v2.services(serviceId)
     .verifications.create({to : `+91${phone}`, channel:'sms' })
    
}

export const otpVerify = async (phone:number,otp:number)=>{
    const client=require('twilio')(accountId,authtoken);
    return new Promise((resolve,reject)=>{
        client.verify.v2
        .services(serviceId)
        .verificationChecks.create({to : `+91${phone}`,code:otp})
        .then((verification_check:any)=>{
            resolve(verification_check);
        })
    })

}

