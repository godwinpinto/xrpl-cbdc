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
exports.getAccountDetails = exports.registerChannel = void 0;
const notificationRepository_1 = require("../repository/notificationRepository");
const walletUtils_1 = require("../ripple/walletUtils");
const constants_1 = require("../utils/constants");
const snowflake_uuid_1 = require("snowflake-uuid");
const jsonpath_1 = __importDefault(require("jsonpath"));
const xrpl_1 = require("xrpl");
const generator = new snowflake_uuid_1.Worker(0, 1, {
    workerIdBits: 5,
    datacenterIdBits: 5,
    sequenceBits: 12,
});
const registerChannel = (registerNotificationInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const rowId = generator.nextId().toString();
        const dbObject = {
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
            SUB_EXPIRY_DT: (0, constants_1.addMonths)(currentDate, 1),
            MSG_META_INFO: JSON.stringify(registerNotificationInput.msg_meta_info),
            ORIGIN_ADD_DETAILS: JSON.stringify(registerNotificationInput.origin_add_details),
        };
        const result = yield (0, notificationRepository_1.createChannelMaster)(dbObject);
        return parseInt(rowId);
    }
    catch (e) {
        throw new Error(e.message || "Unknown error");
    }
});
exports.registerChannel = registerChannel;
const getAccountDetails = (origin_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, notificationRepository_1.fetchAccountsByDeviceId)(origin_id);
        console.log("result", result);
        const result1 = yield (0, walletUtils_1.walletBalance)(result.XRPL_AC_NO);
        const balance = jsonpath_1.default.query(result1, '$.result.account_data.Balance')[0];
        console.log("result1", balance);
        const result3 = yield (0, walletUtils_1.getLast10Transactions)(result.XRPL_AC_NO);
        console.log("result3", result3);
        const transactions = result3.result.transactions;
        const transactionsOutput = new Array();
        for (let i = 0; i < transactions.length; i++) {
            const from = jsonpath_1.default.query(transactions[i], '$.tx.Account')[0];
            const amount = (0, xrpl_1.dropsToXrp)(jsonpath_1.default.query(transactions[i], '$.tx.Amount')[0]);
            const date = jsonpath_1.default.query(transactions[i], '$.tx.date')[0];
            var d = new Date(0);
            d.setUTCSeconds(date);
            transactionsOutput.push({
                from, amount, date: d.toUTCString()
            });
        }
        const response = {
            account: result.XRPL_AC_NO,
            balance: (0, xrpl_1.dropsToXrp)(balance),
            txn: transactionsOutput
        };
        return response;
    }
    catch (e) {
        console.log("here");
        throw new Error(e.message || "Unknown error");
    }
});
exports.getAccountDetails = getAccountDetails;
