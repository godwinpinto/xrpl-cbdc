import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { GenericResponse } from '../exception/responseJson';
import { getPixDetails } from '../service/pixService';
import { PixResponse } from '../ripple/commonInterfaces';

const router = express.Router();

router.get('/v1/account/:pixId', async (req: Request, res: Response) => {

    const pixId = req.params.pixId;
    let response:PixResponse;

    if (!pixId || pixId.trim() == "") {
        throw new Error("Invalid request data");
    }
    try {
        response = await getPixDetails(pixId);
        response.currency_accepted = process.env.CURRENCY;
        response;
    } catch (e) {
        console.log("error in controller", e)
        response = {
            xrpl_account_no: "0",
            currency_accepted: "",
            pix_id:pixId
        }
    }

    res.json({ response });
});



export default router