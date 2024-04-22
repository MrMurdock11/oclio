import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';

import { ApplicationModule } from '$application/application.module';

import { AuthController } from './auth/auth.controller';
import { AccessTokenGuard } from './guards/access-token.guard';
import { SocialLinkTypesController } from './social-link-types/social-link-types.controller';
import { SocialLinksController } from './social-links/social-links.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersController } from './users/users.controller';

@Module({
  imports: [ApplicationModule, CqrsModule, PassportModule],
  controllers: [
    UsersController,
    AuthController,
    SocialLinksController,
    SocialLinkTypesController,
  ],
  providers: [JwtStrategy, AccessTokenGuard],
})
export class ApiModule {}
