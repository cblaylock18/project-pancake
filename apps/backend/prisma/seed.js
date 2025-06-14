import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        username: 'alice',
        email: 'alice@example.com',
        password: 'password123', // Note: hash this in real apps
        role: Role.USER,
      },
      {
        username: 'bob',
        email: 'bob@example.com',
        password: 'secure456',
        role: Role.ADMIN,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log('Seeding complete');
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
