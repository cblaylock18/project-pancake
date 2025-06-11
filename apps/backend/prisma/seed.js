import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        username: 'alice',
        password: 'password123', // Note: hash this in real apps
      },
      {
        username: 'bob',
        password: 'secure456',
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
