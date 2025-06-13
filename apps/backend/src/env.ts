import { cleanEnv, str, port } from 'envalid';
import dotenv from "dotenv"
dotenv.config()

export const env = cleanEnv(process.env, {
  DATABASE_URL: str(),
  PORT: port({ default: 3000 }),
  FRONTEND_ORIGIN_1: str({ default: 'http://localhost:5173' }),
  ENVIRONMENT_NAME: str({default: "development"})
});
