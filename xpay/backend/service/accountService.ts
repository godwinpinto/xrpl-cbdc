import { createXrplAccount, fetchXrplAccountByAccountId } from '../repository/accountRepository'
import { createPixId, fetchRpayByPixId } from '../repository/rpayRepository'
import { Worker } from 'snowflake-uuid';
import { generate } from 'xrpl-accountlib'
import { sha512 } from 'sha512-crypt-ts';
import  {Client, Wallet }  from "xrpl";

import { PrismaClient } from '@prisma/client'
import {fundWallet, makePayment, walletBalance} from '../ripple/walletUtils';
import { IFundResults } from '../ripple/commonInterfaces';
const prisma = new PrismaClient()


const generator = new Worker(0, 1, {
    workerIdBits: 5,
    datacenterIdBits: 5,
    sequenceBits: 12,
});

export const registerUser = async (identifier: string, pin: string):Promise<IFundResults | null> => {

    try {
        const pixData = await fetchRpayByPixId(identifier);
        if (!pixData || pixData == null) {
            const wallet = Wallet.generate()
            console.log("wallet",wallet)

            const currentDate = new Date();
            const rowId = generator.nextId().toString();
            const xrplAccountEntity = {
                XAM_ROW_ID: rowId,
                AC_NO: wallet.address,
                SEED: wallet.seed,
                ACTIVE: "Y",
                CREATED_DT: currentDate.toISOString(),
                CREATED_BY: "SYSTEM",
                UPDATED_DT: currentDate.toISOString(),
                UPDATED_BY: "SYSTEM"
            }
            const rPayAccountEntity = {
                XPAM_ROW_ID: rowId,
                XAM_ROW_ID: rowId,
                PIX_ID: identifier,
                PIN: sha512.crypt(pin, rowId.substring(0,8)),
                ATTEMPTS: 0,
                ACTIVE: "Y",
                CREATED_DT: currentDate.toISOString(),
                CREATED_BY: "SYSTEM",
                UPDATE_DT: currentDate.toISOString(),
                UPDATE_BY: "SYSTEM"
            }

            const transactionStatus:boolean=await prisma.$transaction(async (tx:any) => {
                await createXrplAccount(xrplAccountEntity, tx);
                await createPixId(rPayAccountEntity, tx);
                return true;
            });
            if(transactionStatus){
                console.log("Transaction success")
                const results =await fundWallet(wallet.seed || '');
                return results;
            }else{
                throw new Error("Transaction Failed"); 
            } 

        } else {
            throw new Error("Account already Registered"); 
        }
    } catch (e: any) {
        throw new Error(e.message|| "Unknown error")
    }
}


export const authenticateUserByPixId = async (identifier: string, pin: string):Promise<boolean> => {

    try {
        const pixData = await fetchRpayByPixId(identifier);
        if (pixData) {
            if(!pin && pixData.PIN != sha512.crypt(pin, pixData.XPAM_ROW_ID.substring(0,8))){
                return false;
            }else{
                return true;
            }
            
        }else{
            return false
        }
    } catch (e: any) {
        throw new Error(e.message|| "Unknown error")
    }


};


export const getBalance = async (identifier: string):Promise<any> => {

    try {
        const pixData = await fetchRpayByPixId(identifier);
        if (pixData) {
            const acData=await fetchXrplAccountByAccountId(pixData.XAM_ROW_ID)
            if(acData){
                const acBalance=await walletBalance(acData.AC_NO)
                return acBalance;
            }else{
                throw new Error("Invalid Account")
            }
        }else{
            throw new Error("Invalid Account")
        }
    } catch (e: any) {
        throw new Error(e.message|| "Unknown error")
    }


};


export const sendMoney = async (identifier: string, pixId:string, amount:string):Promise<any> => {

    try {
        const pixData = await fetchRpayByPixId(identifier);
        if (pixData) {
            const acData=await fetchXrplAccountByAccountId(pixData.XAM_ROW_ID)
            if(acData){
                //const acBalance=await walletBalance(acData.AC_NO)

const paymentStatus=makePayment(acData.SEED, "rPTPn2Pxx824YVzcjHvUeXx7V3wkCFP52a",parseFloat(amount))

                return paymentStatus;
            }else{
                throw new Error("Invalid Account")
            }
        }else{
            throw new Error("Invalid Account")
        }
    } catch (e: any) {
        throw new Error(e.message|| "Unknown error")
    }


};


