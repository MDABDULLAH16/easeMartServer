import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';

import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import cookieParser from 'cookie-parser';
const app: Application = express();
// Use cookie-parser middleware
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://easemartletestv2.vercel.app'],
    credentials: true,
  })
);

// application routes
app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to EaseMart');
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
