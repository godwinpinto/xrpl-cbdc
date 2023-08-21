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
exports.fetchAccountsByAccountNo = exports.fetchAccountsByDeviceId = exports.fetchDistinctAccounts = exports.disableChannelMaster = exports.createChannelMaster = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createChannelMaster = (createInput) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.xRPL_USER_CHANNEL_MASTER.create({
        data: createInput,
    });
    console.log("create", result);
    return result;
});
exports.createChannelMaster = createChannelMaster;
const disableChannelMaster = (origin_id, updated_by, updated_dt) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.xRPL_USER_CHANNEL_MASTER.update({
        data: {
            ACTIVE: "N",
            UPDATED_BY: updated_by,
            UPDATED_DT: updated_dt
        },
        where: {
            XUCM_ROW_ID: origin_id
        }
    });
    console.log("create", result);
    return result;
});
exports.disableChannelMaster = disableChannelMaster;
const fetchDistinctAccounts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.xRPL_USER_CHANNEL_MASTER.findMany({
        where: { ACTIVE: "Y" },
        distinct: 'XRPL_AC_NO',
        select: { XRPL_AC_NO: true }
    });
    return result;
});
exports.fetchDistinctAccounts = fetchDistinctAccounts;
const fetchAccountsByDeviceId = (origin_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.xRPL_USER_CHANNEL_MASTER.findFirst({
        where: { ORIGIN_ID: origin_id, ACTIVE: "Y" },
        select: { XRPL_AC_NO: true, XUCM_ROW_ID: true }
    });
    console.log("fetch", result);
    return result;
});
exports.fetchAccountsByDeviceId = fetchAccountsByDeviceId;
const fetchAccountsByAccountNo = (account_number) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.xRPL_USER_CHANNEL_MASTER.findMany({
        where: {
            XRPL_AC_NO: account_number,
            ACTIVE: "Y"
        }
    });
    console.log("fetch", result);
    return result;
});
exports.fetchAccountsByAccountNo = fetchAccountsByAccountNo;
