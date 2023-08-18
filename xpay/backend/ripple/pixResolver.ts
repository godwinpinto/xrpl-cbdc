import { createXrplAccount, fetchXrplAccountByAccountId } from '../repository/accountRepository'
import { createPixId, fetchRpayByPixId } from '../repository/rpayRepository'

export const getDestinationXrplAccountNo = async (pixId:string):Promise<string> => {
    const newPixId = pixId.split("@");
    try {
        // TODO:: Check if Pix is local, if not then call the Pix centralized service to identify account 

        const pixData = await fetchRpayByPixId(newPixId[0]);
        if (pixData) {
            const acData=await fetchXrplAccountByAccountId(pixData.XAM_ROW_ID)
            if(acData){
                //const acBalance=await walletBalance(acData.AC_NO)
                return acData.AC_NO;
            }else{
                throw new Error("Invalid Account")
            }
        }else{
            throw new Error("Invalid Account")
        }
    } catch (e: any) {
        throw new Error(e.message|| "Unknown error")
    }
};