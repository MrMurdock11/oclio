import { Module } from '@nestjs/common';

import { SecurityModule } from './security/security.module';
import { SocialLinkTypesModule } from './social-link-types/social-link-types.module';
import { SocialLinksModule } from './social-links/social-links.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SecurityModule,
    UsersModule,
    SocialLinksModule,
    SocialLinkTypesModule,
  ],
})
export class ApplicationModule {}
