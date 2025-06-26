import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', password: 'password123' },
  });

  await prisma.post.deleteMany();
  await prisma.post.createMany({
    data: [
      {
        title: 'Getting Started with Web3 Development',
        summary: 'An introduction to building decentralized apps on the blockchain.',
        body: 'This post covers the basic tools and frameworks you need to begin creating Web3 applications.',
      },
      {
        title: 'Understanding Smart Contracts',
        summary: 'A look at how smart contracts power decentralized platforms.',
        body: 'We explore how smart contracts work and how you can write and deploy them to various networks.',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
