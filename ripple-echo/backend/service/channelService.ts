import jsonpath from "jsonpath";
import { fetchAccountsByAccountNo } from "../repository/notificationRepository";
import { sendFcmNotification } from "../ripple/sendFcmNotification";
import { sendWebNotification } from "../ripple/sendWebNotification";

export const processNotification=async(event:any)=>{
try{
    console.log("event.data",event.data)
    const jsonData = JSON.parse(event.data);

    const transactionType=jsonpath.query(jsonData, '$.transaction.TransactionType')[0];
    console.log("transactionType",transactionType)
    if(transactionType=="Payment"){
         const recepientAccountNo=jsonpath.query(jsonData, '$.transaction.Destination')[0];
        const devices:Array<any>=await fetchAccountsByAccountNo(recepientAccountNo);
//        sendFcmNotification(event.data, devices[0])
console.log("devices",devices)
        for(const device of devices){
            sendWebNotification(event.data,device.ORIGIN_ID,device.MSG_META_INFO);

            /*             if(device.CONTACT_TYPE=="WEB"){
                //web push
                sendWebNotification(event.data);
            }else if(device.CONTACT_TYPE=="NOT"){
                //FCM push notification
                sendWebNotification(event.data);
            }
 */        }
    }
}catch(e){
    console.log(e)
}

}


