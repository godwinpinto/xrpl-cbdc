import { Wallet } from "xrpl";

export interface IFundResults{
    wallet: Wallet;
    balance: number;
}