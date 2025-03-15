import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtConfigModule } from '@common/modules/jwt-config.module';
import { ApplicationModule } from '@gateway/application/application.module';

import { ServicesModule } from '../application/services/services.module';
import { AuthController } from './auth/auth.controller';
import { AccessTokenGuard } from './guards/access-token.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersController } from './users/users.controller';

@Module({
  imports: [ApplicationModule, PassportModule, JwtConfigModule, ServicesModule],
  controllers: [UsersController, AuthController],
  providers: [JwtStrategy, AccessTokenGuard, JwtAuthGuard],
})
export class ApiModule {}
