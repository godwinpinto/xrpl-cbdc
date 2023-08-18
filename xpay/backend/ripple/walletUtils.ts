import xrpl, { AccountInfoRequest, Client, Wallet, xrpToDrops } from "xrpl";
import { XRPL_NETWORK } from '../utils/constants'
import { IFundResults } from "./commonInterfaces";




export const fundWallet = async (familySeed: string): Promise<IFundResults | null> => {
    console.log(XRPL_NETWORK);
    //    const test_wallet = xrpl.Wallet.fromSeed(familySeed)

    const client = new Client("wss://" + XRPL_NETWORK)

    console.log("1")
    let results: IFundResults;
    try {
        await client.connect();
        const newWallet = Wallet.fromSeed(familySeed)
        console.log("2")
        const fund_result = await client.fundWallet(newWallet);
        console.log("fund_result", fund_result);
        results = fund_result;
        return results;
    } catch (e: any) {
        console.log(e)
    } finally {
        try {
            client.disconnect()
        } catch (e) {
            //console.log("disconnect", e)
        }
    }
    return null;

}



export const walletBalance = async (walletAddress: string): Promise<any | null> => {
    const client = new Client("wss://" + XRPL_NETWORK)
    let results: IFundResults;
    try {
        await client.connect();
        console.log("2")

        const command: AccountInfoRequest = {
            account: walletAddress,
            command: "account_info",
            ledger_index: "validated"
        }
        const balance_result = await client.request(command);

        console.log("balance_result", balance_result);

        return balance_result;
    } catch (e: any) {
        console.log(e)
    } finally {
        try {
            client.disconnect()
        } catch (e) {
            //console.log("disconnect", e)
        }
    }
    return null;

}

export const makePayment = async (familySeed: string, destinationAddress: string, amount: number):Promise<any | null> => {

    const client = new Client("wss://" + XRPL_NETWORK)

    try {
        const sourceWallet = Wallet.fromSeed(familySeed)
        await client.connect();
        const prepareTransaction = await client.autofill({
            TransactionType: "Payment",
            Account: sourceWallet.address,
            Amount: xrpToDrops(amount),
            Destination: destinationAddress
        })

        console.log("Submitting the transaction (Takes 3-5 seconds)");
        const submitted_tx = await client.submitAndWait(prepareTransaction, {
            autofill: true, // Adds in fields that can be automatically set like fee and last_ledger_sequence
            wallet: sourceWallet
        });
        if (submitted_tx) {
            console.log("Transaction result:",submitted_tx);
            return submitted_tx;
        }
    } catch (e: any) {
        console.log(e)
    } finally {
        try {
            client.disconnect()
        } catch (e) {
            //console.log("disconnect", e)
        }
    }
    return null;
}