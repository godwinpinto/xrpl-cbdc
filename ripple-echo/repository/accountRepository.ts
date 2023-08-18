import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

/* export const createXrplAccount = async (record: any,tx:any): Promise<any> => {
    const result = await tx.xRPL_ACCOUNT_MASTER.create({
        data: record,
    })
    console.log("create", result)
    return result;
} */

export const fetchXrplAccountByAccountId = async (accountId: string):Promise<any> => {
    const result = await prisma.xRPL_ACCOUNT_MASTER.findFirst({
        where: { XAM_ROW_ID: accountId }
    })
    console.log("fetch", result);
    return result;
}

