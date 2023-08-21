import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { GenericResponse } from '../exception/responseJson';
import { PixResponse } from '../ripple/commonInterfaces';
import { admin } from '../utils/firebaseConfig'
import { RegisterNotificationInput } from '../utils/constants';
import { getAccountDetails, registerChannel } from '../service/notificationService';


const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {

    const response:GenericResponse={}
    const { account_no, origin_id, origin_add_details, contact_id, contact_type, subscription_details, msg_meta_info, sub_expiry } = req.body

    const registerNotificationInput:RegisterNotificationInput = {
        account_no, origin_id, origin_add_details, contact_id, contact_type, subscription_details, msg_meta_info, sub_expiry
    }

    try{
        const result=await registerChannel(registerNotificationInput);
        response.status=200
        response.data={
            txn_id:result
        }
    }catch(e:any){
        response.status=300
        response.msg=e.message || "Unknown error"
    }
    res.json({ response });
});


router.post('/dashboard', async (req: Request, res: Response) => {

    const response:GenericResponse={}
    const { origin_id } = req.body

    try{
        const result=await getAccountDetails(origin_id);
        response.status=200
        response.data={
            result
        }
    }catch(e:any){
        
        response.status=300
        response.msg=e.message || "Unknown error"
    }
    res.json({ response });
});




export default router