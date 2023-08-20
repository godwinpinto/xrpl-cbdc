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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerChannel = void 0;
const notificationRepository_1 = require("../repository/notificationRepository");
const constants_1 = require("../utils/constants");
const snowflake_uuid_1 = require("snowflake-uuid");
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
