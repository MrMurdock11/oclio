import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'Stephen King',
        bio: 'Stephen Edwin King is an American author. Called the "King of Horror", he has also explored other genres, among them suspense, crime, science-fiction, fantasy and mystery. He has also written approximately 200 short stories, most of which have been published in collections.',
        email: 'stephen.king@oclio.com',
        hashedPassword:
          '$2a$12$B1/RVvEjeXFOGBP9gnRMF.rnquFD7bvQN51NdYMc2wvgTNatLBeBO',
        preferences: { theme: 'white' },
      },
      {
        fullName: 'George Orwell',
        bio: 'Eric Arthur Blair was a British novelist, poet, essayist, journalist, and critic who wrote under the pen name of George Orwell. His work is characterised by lucid prose, social criticism, opposition to all totalitarianism, and support of democratic socialism.',
        email: 'george.orwell@oclio.com',
        hashedPassword:
          '$2a$12$B1/RVvEjeXFOGBP9gnRMF.rnquFD7bvQN51NdYMc2wvgTNatLBeBO',
        preferences: { theme: 'dark' },
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
