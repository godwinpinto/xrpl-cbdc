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
exports.getPixDetails = void 0;
const accountRepository_1 = require("../repository/accountRepository");
const rpayRepository_1 = require("../repository/rpayRepository");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPixDetails = (pixId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pixData = yield (0, rpayRepository_1.fetchRpayByPixId)(pixId);
        if (pixData) {
            const acData = yield (0, accountRepository_1.fetchXrplAccountByAccountId)(pixData.XAM_ROW_ID);
            if (acData) {
                const pixResponse = {
                    pix_id: pixId,
                    xrpl_account_no: acData.AC_NO
                };
                return pixResponse;
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
exports.getPixDetails = getPixDetails;
