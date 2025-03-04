import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';

import { ApplicationModule } from '../application/application.module';
import { AuthController } from './auth/auth.controller';
import { AccessTokenGuard } from './guards/access-token.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [ApplicationModule, CqrsModule, PassportModule],
  controllers: [AuthController],
  providers: [JwtStrategy, AccessTokenGuard],
})
export class ApiModule {}
