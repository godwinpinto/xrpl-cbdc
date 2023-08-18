"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const echoController_1 = __importDefault(require("./controller/echoController"));
const accountListener_1 = require("./ripple/accountListener");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/send', echoController_1.default);
app.get('/', (req, res) => {
    res.send('Ripple PSP API is running');
});
setInterval(() => {
    // Your background process logic here
    console.log('Background process is running...');
    (0, accountListener_1.startListeningAccounts)();
}, 60000); // 5000 milliseconds = 5 seconds
(0, accountListener_1.startListeningAccounts)();
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
