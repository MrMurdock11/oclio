import { Module } from '@nestjs/common';

import { GetSocialLinkTypesHandler } from './queries/get-social-link-types/social-link-types.handler';

@Module({
  providers: [GetSocialLinkTypesHandler],
})
export class SocialLinkTypesModule {}
