import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { GenericResponse } from '../exception/responseJson';
import { authenticateUserByPixId, getBalance, registerUser, sendMoney } from '../service/accountService';

const router = express.Router();




router.get('/v1/account/:pixId', async (req: Request, res: Response) => {

    const pixId=req.params.pixId;
    const response= {
        "xrpl_account_no":"1",
        "currency_accepted":"XRPL",
        "additional_data":pixId
    }
    res.json({ response });
});



export default router