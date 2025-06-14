import express from 'express';
import type {Express} from "express"
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './env';

export function createServer(): Express {
  const app = express();
  app.use(express.json());

  app.set('trust proxy', 1);
  app.use(helmet());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  env.FRONTEND_ORIGIN_1,
  env.FRONTEND_ORIGIN_2
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

  const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
  app.use(limiter);

  app.get('/health', (req, res) => {res.status(200).json({message: 'OK'})});
  app.get('/', (req, res) => {res.status(200).json({message: 'Hi from the backend!'})});

  return app;
}
