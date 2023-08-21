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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pixService_1 = require("../service/pixService");
const router = express_1.default.Router();
router.get('/v1/account/:pixId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pixId = req.params.pixId;
    let response;
    if (!pixId || pixId.trim() == "") {
        throw new Error("Invalid request data");
    }
    try {
        response = yield (0, pixService_1.getPixDetails)(pixId);
        response.currency_accepted = process.env.CURRENCY;
        response;
    }
    catch (e) {
        console.log("error in controller", e);
        response = {
            xrpl_account_no: "0",
            currency_accepted: "",
            pix_id: pixId
        };
    }
    res.json({ response });
}));
exports.default = router;
