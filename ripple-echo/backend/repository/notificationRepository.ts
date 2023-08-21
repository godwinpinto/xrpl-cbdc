import { PrismaClient } from '@prisma/client'
import type { XRPL_USER_CHANNEL_MASTER } from '@prisma/client'

const prisma = new PrismaClient()

export const createChannelMaster = async (createInput: XRPL_USER_CHANNEL_MASTER): Promise<any> => {
    const result = await prisma.xRPL_USER_CHANNEL_MASTER.create({
        data: createInput,
    })
    console.log("create", result)
    return result;
}

export const disableChannelMaster = async (origin_id: string, updated_by: string, updated_dt: Date): Promise<any> => {
    const result = await prisma.xRPL_USER_CHANNEL_MASTER.update({
        data: {
            ACTIVE: "N",
            UPDATED_BY: updated_by,
            UPDATED_DT: updated_dt
        },
        where: {
            XUCM_ROW_ID: origin_id
        }
    })
    console.log("create", result)
    return result;
}

export const fetchDistinctAccounts = async (): Promise<any> => {
    const result = await prisma.xRPL_USER_CHANNEL_MASTER.findMany({
        where: { ACTIVE: "Y" },
        distinct: 'XRPL_AC_NO',
        select: { XRPL_AC_NO: true }
    })
    return result;
}

export const fetchAccountsByDeviceId = async (origin_id: string): Promise<any> => {
    const result = await prisma.xRPL_USER_CHANNEL_MASTER.findFirst({
        where: { ORIGIN_ID: origin_id, ACTIVE: "Y" },
        select: { XRPL_AC_NO: true,XUCM_ROW_ID:true }
    })
    console.log("fetch", result);
    return result;
}

export const fetchAccountsByAccountNo = async (account_number: string): Promise<any> => {
    const result = await prisma.xRPL_USER_CHANNEL_MASTER.findMany({
        where: {
            XRPL_AC_NO: account_number,
            ACTIVE: "Y"
        }
    })
    console.log("fetch", result);
    return result;
}
