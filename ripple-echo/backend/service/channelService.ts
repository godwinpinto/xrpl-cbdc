import jsonpath from "jsonpath";
import { fetchAccountsByAccountNo } from "../repository/notificationRepository";
import { sendFcmNotification } from "../ripple/sendFcmNotification";
import { sendWebNotification } from "../ripple/sendWebNotification";

export const processNotification=async(event:any)=>{

    const transactionType=jsonpath.query(event.data, '$.result.TransactionType')[0];
    if(transactionType=="Payment"){
         const recepientAccountNo=jsonpath.query(event.data, '$.result.Destination')[0];
        const devices:Array<any>=await fetchAccountsByAccountNo(recepientAccountNo);
//        sendFcmNotification(event.data, devices[0])
        sendWebNotification(event.data);

/*        for(const device of devices){
            if(device.CONTACT_TYPE=="WEB"){
                //web push
                sendWebNotification(event.data);
            }else if(device.CONTACT_TYPE=="NOT"){
                //FCM push notification
                sendWebNotification(event.data);
            }
        }
 */
    }


}


