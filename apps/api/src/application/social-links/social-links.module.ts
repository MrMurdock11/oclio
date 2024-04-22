import { Module } from '@nestjs/common';

import { ServicesModule } from '$application/services/services.module';

import { PrismaModule } from '$persistence/prisma/prisma.module';

import { AddSocialLinkHandler } from './commands/add-social-link/add-social-link.handler';
import { RemoveSocialLinkHandler } from './commands/remove-social-link/remove-social-link.handler';
import { UpdateSocialLinkHandler } from './commands/update-social-link/update-social-link.handler';
import { GetSocialLinksHandler } from './queries/get-social-links/get-social-links.handler';

@Module({
  imports: [PrismaModule, ServicesModule],
  providers: [
    GetSocialLinksHandler,
    AddSocialLinkHandler,
    UpdateSocialLinkHandler,
    RemoveSocialLinkHandler,
  ],
})
export class SocialLinksModule {}
