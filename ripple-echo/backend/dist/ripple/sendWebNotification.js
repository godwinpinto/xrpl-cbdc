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
exports.sendWebNotification = void 0;
const pusher_1 = __importDefault(require("pusher"));
const jsonpath_1 = __importDefault(require("jsonpath"));
const xrpl_1 = require("xrpl");
const sendWebNotification = (eventData, destination, metaInfo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("destination", destination);
    const jsonData = JSON.parse(eventData);
    const transactionResult = jsonpath_1.default.query(jsonData, '$.engine_result')[0];
    const type = jsonpath_1.default.query(jsonData, '$.type')[0];
    const validated = jsonpath_1.default.query(jsonData, '$.validated')[0];
    const balance = jsonpath_1.default.query(jsonData, '$.meta.AffectedNodes[0].ModifiedNode.FinalFields.Balance')[0];
    const transactionAmount = jsonpath_1.default.query(jsonData, '$.transaction.Amount')[0];
    if (validated == true && transactionResult == "tesSUCCESS" && type == "transaction") {
        const messageText = (0, xrpl_1.dropsToXrp)(transactionAmount);
        console.log(process.env.ACCOUNT_NO, process.env.PUSHER_CHANNEL);
        console.log(messageText);
        const pusher = new pusher_1.default({
            appId: process.env.PUSHER_APP_ID || '',
            key: process.env.PUSHER_KEY || '',
            secret: process.env.PUSHER_SECRET || '',
            cluster: process.env.PUSHER_CLUSTER || '',
            useTLS: true
        });
        pusher.trigger(process.env.PUSHER_CHANNEL || '', destination || '', {
            message: messageText,
            meta: metaInfo
        });
    }
    else {
        console.log("something was not right");
    }
});
exports.sendWebNotification = sendWebNotification;
