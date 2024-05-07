import { Module } from '@nestjs/common';

import { PrismaModule } from '../../persistence/prisma/prisma.module';
import { ServicesModule } from '../services/services.module';
import { AddSocialLinkHandler } from './commands/add-social-link/add-social-link.handler';
import { RemoveSocialLinkHandler } from './commands/remove-social-link/remove-social-link.handler';
import { UpdateSocialLinkHandler } from './commands/update-social-link/update-social-link.handler';
import { GetSocialLinksHandler } from './queries/get-social-links/get-social-links.handler';

const QueryHandlers = [GetSocialLinksHandler];
const CommandHandlers = [
  AddSocialLinkHandler,
  UpdateSocialLinkHandler,
  RemoveSocialLinkHandler,
];

@Module({
  imports: [PrismaModule, ServicesModule],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class SocialLinksModule {}
