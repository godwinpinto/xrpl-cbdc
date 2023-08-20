import { createChannelMaster } from '../repository/notificationRepository'
import { fetchRpayByPixId } from '../repository/rpayRepository'
import { PrismaClient } from '@prisma/client'
import { PixResponse } from '../ripple/commonInterfaces';
import { RegisterNotificationInput, addMonths } from '../utils/constants';
import type { XRPL_USER_CHANNEL_MASTER } from '@prisma/client'
import { Worker } from 'snowflake-uuid';

const generator = new Worker(0, 1, {
    workerIdBits: 5,
    datacenterIdBits: 5,
    sequenceBits: 12,
});


export const registerChannel = async (registerNotificationInput: RegisterNotificationInput): Promise<number> => {
    try {
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
        const result = await createChannelMaster(dbObject);
        return parseInt(rowId);
    } catch (e: any) {
        throw new Error(e.message || "Unknown error")
    }
}

