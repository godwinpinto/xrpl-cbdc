import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createPixId = async (record: any,tx:any) => {
    const result = await tx.xPAY_ACCOUNT_MASTER.create({
        data: record,
    })
    console.log("create pix", result)
}

export const fetchRpayByPixId = async (pixId: string): Promise<any> => {
    try {
        const result = await prisma.xPAY_ACCOUNT_MASTER.findFirst({
            where: { PIX_ID: pixId }
        })
        return result;
    } catch (e:any) {
        console.error("Error fetching pix:", e);
        throw new Error(e.message||"Unknown Error"); // Throw an error in case of failure
    }
}

