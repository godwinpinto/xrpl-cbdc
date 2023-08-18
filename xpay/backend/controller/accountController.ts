import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { GenericResponse } from '../exception/responseJson';
import { authenticateUserByPixId, getBalance, registerUser, sendMoney } from '../service/accountService';

const router = express.Router();




router.post('/register', async (req: Request, res: Response) => {

    const response: GenericResponse = {}
    try {
        const { identifier, pin } = req.body
        console.log("identifier", identifier, pin)
        if (!identifier || !pin || identifier.trim() == "" || pin.trim() == "") {
            throw new Error("Invalid request data");
        }
        const results=await registerUser(identifier.trim(),pin.trim());
        response.status = 200
        response.data=results
    } catch (e: any) {
        console.log("error", e)
        response.status = 500
        response.msg = e.message || "An error occurred"
    }

    res.json({ response });
});

router.post('/balance', async (req: Request, res: Response) => {
    const response: GenericResponse = {}
    try {
        const { identifier, pin } = req.body
        console.log("identifier", identifier, pin)
        if (!identifier || !pin || identifier.trim() == "" || pin.trim() == "") {
            throw new Error("Invalid request data");
        }
        if(!await authenticateUserByPixId(identifier,pin)){
            throw new Error("Invalid login / pin");
        }

        const results=await getBalance(identifier.trim());
        response.status = 200
        response.data=results
    } catch (e: any) {
        console.log("error", e)
        response.status = 500
        response.msg = e.message || "An error occurred"
    }

    res.json({ response });

});


router.post('/transfer', async (req: Request, res: Response) => {
    const response: GenericResponse = {}
    try {
        const { identifier, pin, destinationPixId, amount } = req.body
        console.log("identifier", identifier, pin,destinationPixId,amount)
        if (!identifier || !pin ||!destinationPixId || !amount || identifier.trim() == "" || pin.trim() == ""|| destinationPixId.trim() == "" || amount.trim() == "") {
            throw new Error("Invalid request data");
        }
        if(!await authenticateUserByPixId(identifier,pin)){
            throw new Error("Invalid login / pin");
        }

        const results=await sendMoney(identifier.trim(),destinationPixId.trim(),amount.trim());
        response.status = 200
        response.data=results
    } catch (e: any) {
        console.log("error", e)
        response.status = 500
        response.msg = e.message || "An error occurred"
    }

    res.json({ response });

});


export default router