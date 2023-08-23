import { createChannelMaster, disableChannelMaster, fetchAccountsByDeviceId } from '../repository/notificationRepository'
import { PixResponse } from '../ripple/commonInterfaces';
import { getLast10Transactions, walletBalance } from '../ripple/walletUtils';
import { RegisterNotificationInput, addMonths } from '../utils/constants';
import type { XRPL_USER_CHANNEL_MASTER } from '@prisma/client'
import { Worker } from 'snowflake-uuid';
import jsonpath from "jsonpath";
import { dropsToXrp } from "xrpl";
import { doSubscribe } from '../ripple/accountListener';


const generator = new Worker(0, 1, {
    workerIdBits: 5,
    datacenterIdBits: 5,
    sequenceBits: 12,
});



export const validateLogin = async (origin_id: string): Promise<boolean> => {
    try {
        const result = await fetchAccountsByDeviceId(origin_id);
        if(result){
            return true
        }else{
            return false
        }
    } catch (e: any) {
        console.log("here")
        throw new Error(e.message || "Unknown error")
    }
}

export const verifyAccountService = async (account_no: string): Promise<boolean> => {
    try {
        const result = await walletBalance(account_no);
        if(result){
            return true
        }else{
            return false
        }
    } catch (e: any) {
        console.log("here")
        throw new Error(e.message || "Unknown error")
    }
}

export const registerChannel = async (registerNotificationInput: RegisterNotificationInput): Promise<number> => {
    try {

        const fetchResults = await fetchAccountsByDeviceId(registerNotificationInput.origin_id);
        console.log("fetchResults",fetchResults)
        if(fetchResults){
            disableChannelMaster(fetchResults.XUCM_ROW_ID,"USER",new Date());
        }
        const currentDate = new Date();
        const rowId = generator.nextId().toString();
        const dbObject: XRPL_USER_CHANNEL_MASTER = {
            XUCM_ROW_ID: rowId,
            ACTIVE: "Y",
            CREATED_DT: currentDate,
            UPDATED_DT: currentDate,
            CREATED_BY: "SYSTEM",
            UPDATED_BY: "SYSTEM",
            CONTACT_ID: registerNotificationInput.contact_id,
            CONTACT_TYPE: registerNotificationInput.contact_type,
            ORIGIN_ID: registerNotificationInput.origin_id,
            TRANSACTIONS_SUBSCRIBED: JSON.stringify(registerNotificationInput.subscription_details),
            XRPL_AC_NO: registerNotificationInput.account_no,
            SUB_EXPIRY_DT: addMonths(currentDate, 1),
            MSG_META_INFO: JSON.stringify(registerNotificationInput.msg_meta_info),
            ORIGIN_ADD_DETAILS: JSON.stringify(registerNotificationInput.origin_add_details),
        }
        console.log("Before result")
        const result = await createChannelMaster(dbObject);
        console.log("result",result)
        if(result){
            doSubscribe([registerNotificationInput.account_no]);
        }
        return parseInt(rowId);
    } catch (e: any) {
        console.log(e)
        throw new Error(e.message || "Unknown error")
    }
}

export const getAccountDetails = async (origin_id: string): Promise<any> => {
    try {
        const result = await fetchAccountsByDeviceId(origin_id);
        console.log("result", result)


        const result1 = await walletBalance(result.XRPL_AC_NO);
        const balance = jsonpath.query(result1, '$.result.account_data.Balance')[0];
        console.log("result1", balance)


        const result3 = await getLast10Transactions(result.XRPL_AC_NO);
        console.log("result3", result3)
        const transactions: Array<any> = result3.result.transactions;
        const transactionsOutput: Array<any> = new Array();
        for (let i = 0; i < transactions.length; i++) {
            console.log(transactions[i])
            const from = jsonpath.query(transactions[i], '$.tx.Account')[0];
            const amount = dropsToXrp(jsonpath.query(transactions[i], '$.tx.Amount')[0]);
            const date = jsonpath.query(transactions[i], '$.tx.date')[0];
//            console.log(946684800+parseInt(date))
/*             var d = new Date(0);
            d.setUTCSeconds(946684800+parseInt(date)); */
            transactionsOutput.push({
                from, amount, date: 946684800+parseInt(date)
            })
        }

        const response = {
            account: result.XRPL_AC_NO,
            balance: dropsToXrp(balance),
            txn: transactionsOutput
        }
        return response;
    } catch (e: any) {
        console.log("here")
        throw new Error(e.message || "Unknown error")
    }
}

export const deleteChannel = async (origin_id:string): Promise<string> => {
    try {
        const fetchResults = await fetchAccountsByDeviceId(origin_id);
        if(fetchResults){
            await disableChannelMaster(fetchResults.XUCM_ROW_ID,"USER",new Date());
        }
        return origin_id;
    } catch (e: any) {
        throw new Error(e.message || "Unknown error")
    }
}