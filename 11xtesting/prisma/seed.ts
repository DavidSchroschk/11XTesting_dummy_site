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
        title: 'Welcome to the Dev Blog',
        summary: 'This blog showcases a simple Next.js demo powered by Prisma.',
        body: 'Feel free to explore the posts and try creating your own!',
      },
      {
        title: 'Using Prisma with Next.js',
        summary: 'Prisma provides a great developer experience for databases.',
        body: 'With Prisma you can easily access your database using a type-safe client.',
      },
      {
        title: 'Deploying SQLite backed apps',
        summary: 'SQLite works well for small demos and prototypes.',
        body: 'Even though SQLite is lightweight, it is powerful enough for many use-cases.',
      },
    ],
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
