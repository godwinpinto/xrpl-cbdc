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
exports.getDestinationXrplAccountNo = void 0;
const accountRepository_1 = require("../repository/accountRepository");
const rpayRepository_1 = require("../repository/rpayRepository");
const getDestinationXrplAccountNo = (pixId) => __awaiter(void 0, void 0, void 0, function* () {
    const newPixId = pixId.split("@");
    try {
        // TODO:: Check if Pix is local, if not then call the Pix centralized service to identify account 
        const pixData = yield (0, rpayRepository_1.fetchRpayByPixId)(newPixId[0]);
        if (pixData) {
            const acData = yield (0, accountRepository_1.fetchXrplAccountByAccountId)(pixData.XAM_ROW_ID);
            if (acData) {
                //const acBalance=await walletBalance(acData.AC_NO)
                return acData.AC_NO;
            }
            else {
                throw new Error("Invalid Account");
            }
        }
        else {
            throw new Error("Invalid Account");
        }
    }
    catch (e) {
        throw new Error(e.message || "Unknown error");
    }
});
exports.getDestinationXrplAccountNo = getDestinationXrplAccountNo;
