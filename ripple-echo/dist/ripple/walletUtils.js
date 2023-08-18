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
exports.makePayment = exports.walletBalance = exports.fundWallet = void 0;
const xrpl_1 = require("xrpl");
const constants_1 = require("../utils/constants");
const fundWallet = (familySeed) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(constants_1.XRPL_NETWORK);
    //    const test_wallet = xrpl.Wallet.fromSeed(familySeed)
    const client = new xrpl_1.Client("wss://" + constants_1.XRPL_NETWORK);
    console.log("1");
    let results;
    try {
        yield client.connect();
        const newWallet = xrpl_1.Wallet.fromSeed(familySeed);
        console.log("2");
        const fund_result = yield client.fundWallet(newWallet);
        console.log("fund_result", fund_result);
        results = fund_result;
        return results;
    }
    catch (e) {
        console.log(e);
    }
    finally {
        try {
            client.disconnect();
        }
        catch (e) {
            //console.log("disconnect", e)
        }
    }
    return null;
});
exports.fundWallet = fundWallet;
const walletBalance = (walletAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new xrpl_1.Client("wss://" + constants_1.XRPL_NETWORK);
    let results;
    try {
        yield client.connect();
        console.log("2");
        const command = {
            account: walletAddress,
            command: "account_info",
            ledger_index: "validated"
        };
        const balance_result = yield client.request(command);
        console.log("balance_result", balance_result);
        return balance_result;
    }
    catch (e) {
        console.log(e);
    }
    finally {
        try {
            client.disconnect();
        }
        catch (e) {
            //console.log("disconnect", e)
        }
    }
    return null;
});
exports.walletBalance = walletBalance;
const makePayment = (familySeed, destinationAddress, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new xrpl_1.Client("wss://" + constants_1.XRPL_NETWORK);
    try {
        const sourceWallet = xrpl_1.Wallet.fromSeed(familySeed);
        yield client.connect();
        const prepareTransaction = yield client.autofill({
            TransactionType: "Payment",
            Account: sourceWallet.address,
            Amount: (0, xrpl_1.xrpToDrops)(amount),
            Destination: destinationAddress
        });
        console.log("Submitting the transaction (Takes 3-5 seconds)");
        const submitted_tx = yield client.submitAndWait(prepareTransaction, {
            autofill: true,
            wallet: sourceWallet
        });
        if (submitted_tx) {
            console.log("Transaction result:", submitted_tx);
            return submitted_tx;
        }
    }
    catch (e) {
        console.log(e);
    }
    finally {
        try {
            client.disconnect();
        }
        catch (e) {
            //console.log("disconnect", e)
        }
    }
    return null;
});
exports.makePayment = makePayment;
