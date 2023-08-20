import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { startListeningAccounts } from './ripple/accountListener';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req: Request, res: Response) => {

  res.send('Recho Lite is running');
});

/* setInterval(() => {
  console.log('Background process is running...');
  startListeningAccounts();
}, 60000);
 */
  startListeningAccounts();

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
