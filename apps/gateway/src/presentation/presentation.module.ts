import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';

import { ClientsModule } from '@oclio/clients';

import { ApplicationModule } from '../application/application.module';
import { AuthController } from './auth/auth.controller';
import { BooksController } from './books/books.controller';
import { AccessTokenGuard } from './guards/access-token.guard';
import { PreferencesController } from './preferences/preferences.controller';
import { SocialLinkTypesController } from './social-link-types/social-link-types.controller';
import { SocialLinksController } from './social-links/social-links.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersController } from './users/users.controller';

@Module({
  imports: [ApplicationModule, CqrsModule, PassportModule, ClientsModule],
  controllers: [
    UsersController,
    AuthController,
    SocialLinksController,
    SocialLinkTypesController,
    PreferencesController,
    BooksController,
  ],
  providers: [JwtStrategy, AccessTokenGuard],
})
export class PresentationModule {}
