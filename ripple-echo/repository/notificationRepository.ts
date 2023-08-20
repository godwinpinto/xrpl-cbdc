import { PrismaClient } from '@prisma/client'
import type { XRPL_USER_CHANNEL_MASTER } from '@prisma/client'

const prisma = new PrismaClient()

export const createChannelMaster = async (createInput: XRPL_USER_CHANNEL_MASTER):Promise<any> => {
    const result = await prisma.xRPL_USER_CHANNEL_MASTER.create({
        data: createInput,
    })
    console.log("create", result)
    return result;
}

export const fetchAccounts = async ():Promise<any> => {
    const result = await prisma.xRPL_USER_CHANNEL_MASTER.findMany({
        where: { ACTIVE: "Y" },
        distinct:'XRPL_AC_NO',
        select:{XRPL_AC_NO:true}
    })
    console.log("fetch", result);
    return result;
}


