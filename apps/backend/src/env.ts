import { cleanEnv, str, port } from 'envalid';

export const env = cleanEnv(process.env, {
  DATABASE_URL: str(),
  PORT: port({ default: 3000 }),
  FRONTEND_ORIGIN_1: str({ default: 'http://localhost:5173' }),
});
