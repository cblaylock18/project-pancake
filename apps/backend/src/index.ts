import { env } from './env';
import { createServer } from './server';

const app = createServer();

// example for you for shared types!
import type { User } from "@shared/types";
import { Role } from "@shared/types"

const Sidney: User = {
    id: "sidney",
    username: "sidney",
    password: "lamb",
    createdAt: "today",
    email: "something@lamb.pancake",
    role: Role.USER
};
console.log(`hi ${Sidney.username}!!!`);
// end of example!

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
});