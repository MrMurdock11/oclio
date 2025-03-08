import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ApplicationModule } from '../application/application.module';
import { AuthController } from './auth/auth.controller';
import { AccessTokenGuard } from './guards/access-token.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ApplicationModule,
    CqrsModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.TOKEN_KEY,
        signOptions: { expiresIn: '2d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AccessTokenGuard, JwtAuthGuard],
})
export class ApiModule {}
