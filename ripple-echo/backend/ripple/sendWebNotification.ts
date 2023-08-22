import Pusher from "pusher";
import jsonpath from "jsonpath";
import { dropsToXrp } from "xrpl";


export const sendWebNotification = async (eventData: any,destination:string): Promise<void> => {
    console.log("destination",destination)
    const jsonData = JSON.parse(eventData);
    const transactionResult = jsonpath.query(jsonData, '$.engine_result')[0];
    const type = jsonpath.query(jsonData, '$.type')[0];
    const validated = jsonpath.query(jsonData, '$.validated')[0];
    const balance = jsonpath.query(jsonData, '$.meta.AffectedNodes[0].ModifiedNode.FinalFields.Balance')[0];
    const transactionAmount = jsonpath.query(jsonData, '$.transaction.Amount')[0];

    if(validated==true && transactionResult=="tesSUCCESS" && type=="transaction"){
        const messageText="You have received "+dropsToXrp(transactionAmount) +" XRP on RippleEcho";
        console.log(process.env.ACCOUNT_NO,process.env.PUSHER_CHANNEL)
        console.log(messageText)
        const pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID || '',
            key: process.env.PUSHER_KEY || '',
            secret: process.env.PUSHER_SECRET || '',
            cluster: process.env.PUSHER_CLUSTER || '',
            useTLS: true
        });
    
        pusher.trigger(process.env.PUSHER_CHANNEL || '', destination || '', {
            message: messageText
        });
    
    }else{
        console.log("something was not right")
    }
}