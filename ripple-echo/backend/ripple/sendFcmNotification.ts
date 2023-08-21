import Pusher from "pusher";
import jsonpath from "jsonpath";
import { dropsToXrp } from "xrpl";
import { admin } from '../utils/firebaseConfig'


export const sendFcmNotification = async (eventData: any,deviceDetails:any): Promise<void> => {

    const jsonData = JSON.parse(eventData);
    const transactionResult = jsonpath.query(jsonData, '$.engine_result')[0];
    const type = jsonpath.query(jsonData, '$.type')[0];
    const validated = jsonpath.query(jsonData, '$.validated')[0];
    const balance = jsonpath.query(jsonData, '$.meta.AffectedNodes[0].ModifiedNode.FinalFields.Balance')[0];
    const transactionAmount = jsonpath.query(jsonData, '$.transaction.Amount')[0];

    if(validated==true && transactionResult=="tesSUCCESS" && type=="transaction"){
        const messageText="You received "+dropsToXrp(transactionAmount) +" XRP on RippleEcho";
        console.log(process.env.ACCOUNT_NO,process.env.PUSHER_CHANNEL)
        console.log(messageText)
        const notification_options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };
    
        const message_notification = {
            notification: {
                title: "Ripple Echo: Payment Received",
                body: messageText,
                sound: "english"
            }, data: {
                title: "Ripple Echo: Payment Received",
                body: messageText,
                sound: "english"
            }
        };
    
        admin.messaging().sendToDevice(deviceDetails.CONTACT_ID, message_notification, notification_options)
            .then(response => {
                console.log("response", response);
                //       res.status(200).send("Notification sent successfully")
            })
            .catch(error => {
                console.log(error);
            });
    }else{
        console.log("something was not right")
    }


}