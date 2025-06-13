import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './env';

export function createServer() {
  const app = express();
  app.use(express.json());

  app.set('trust proxy', 1);
  app.use(helmet());

  const corsOptions = {
    origin: [env.FRONTEND_ORIGIN_1],
    optionsSuccessStatus: 200,
    credentials: true
  };
  app.use(cors(corsOptions));

  const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
  app.use(limiter);

  app.get('/health', (req, res) => {res.status(200).json({message: 'OK'})});
  app.get('/', (req, res) => {res.status(200).json({message: 'Hi from the backend!'})});

  return app;
}
