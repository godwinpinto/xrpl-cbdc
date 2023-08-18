import { fetchXrplAccountByAccountId } from '../repository/accountRepository'
import { fetchRpayByPixId } from '../repository/rpayRepository'
import { PrismaClient } from '@prisma/client'
import { PixResponse } from '../ripple/commonInterfaces';
const prisma = new PrismaClient()

export const getPixDetails = async (pixId: string): Promise<PixResponse> => {

    try {
        const pixData = await fetchRpayByPixId(pixId);
        if (pixData) {
            const acData = await fetchXrplAccountByAccountId(pixData.XAM_ROW_ID)
            if (acData) {
                const pixResponse: PixResponse = {
                    pix_id: pixId,
                    xrpl_account_no: acData.AC_NO
                }
                return pixResponse;
            } else {
                throw new Error("Invalid Account")
            }
        } else {
            throw new Error("Invalid Account")
        }
    } catch (e: any) {
        throw new Error(e.message || "Unknown error")
    }
}

