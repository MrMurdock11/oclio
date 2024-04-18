import { PrismaClient } from '@prisma/client';
import { SocialLinkType } from '../src/common/enums';
const prisma = new PrismaClient();

async function main() {
  await prisma.socialLinkType.createMany({
    data: [
      {
        id: SocialLinkType.Facebook,
        name: SocialLinkType[SocialLinkType.Facebook],
      },
      {
        id: SocialLinkType.Twitter,
        name: SocialLinkType[SocialLinkType.Twitter],
      },
      {
        id: SocialLinkType.Instagram,
        name: SocialLinkType[SocialLinkType.Instagram],
      },
      {
        id: SocialLinkType.Telegram,
        name: SocialLinkType[SocialLinkType.Telegram],
      },
      {
        id: SocialLinkType.TikTok,
        name: SocialLinkType[SocialLinkType.TikTok],
      },
      {
        id: SocialLinkType.YouTube,
        name: SocialLinkType[SocialLinkType.YouTube],
      },
    ],
    skipDuplicates: true,
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
