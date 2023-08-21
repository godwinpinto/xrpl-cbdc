"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processNotification = void 0;
const jsonpath_1 = __importDefault(require("jsonpath"));
const notificationRepository_1 = require("../repository/notificationRepository");
const sendWebNotification_1 = require("../ripple/sendWebNotification");
const processNotification = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("event.data", event.data);
        const jsonData = JSON.parse(event.data);
        const transactionType = jsonpath_1.default.query(jsonData, '$.transaction.TransactionType')[0];
        console.log("transactionType", transactionType);
        if (transactionType == "Payment") {
            const recepientAccountNo = jsonpath_1.default.query(jsonData, '$.transaction.Destination')[0];
            const devices = yield (0, notificationRepository_1.fetchAccountsByAccountNo)(recepientAccountNo);
            //        sendFcmNotification(event.data, devices[0])
            console.log("devices", devices);
            for (const device of devices) {
                (0, sendWebNotification_1.sendWebNotification)(event.data, device.ORIGIN_ID);
                /*             if(device.CONTACT_TYPE=="WEB"){
                    //web push
                    sendWebNotification(event.data);
                }else if(device.CONTACT_TYPE=="NOT"){
                    //FCM push notification
                    sendWebNotification(event.data);
                }
     */ }
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.processNotification = processNotification;
