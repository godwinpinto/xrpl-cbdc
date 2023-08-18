import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import accountController from './controller/accountController';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/account', accountController);


app.get('/', (req: Request, res: Response) => {

  res.send('Ripple Pay API is running');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});