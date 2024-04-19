import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ApplicationModule } from '../application/application.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccessTokenGuard } from './guards/access-token.guard';

@Module({
  imports: [ApplicationModule, CqrsModule, PassportModule],
  controllers: [UsersController, AuthController],
  providers: [JwtStrategy, AccessTokenGuard],
})
export class ApiModule {}
