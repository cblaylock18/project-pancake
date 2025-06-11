import { env } from './env';
import { createServer } from './server';

const app = createServer();

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
});