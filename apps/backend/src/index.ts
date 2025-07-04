import { env } from "./config/env";
import { createServer } from "./server";

const app = createServer();

app.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}`);
});
