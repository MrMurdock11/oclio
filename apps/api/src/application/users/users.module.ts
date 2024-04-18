import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../../persistence/prisma/prisma.module';
import { RegisterUserHandler } from './commands/register/register-user.handler';
import { SecurityModule } from '../security/security.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticateHandler } from './queries/authenticate/authenticate.handler';

@Module({
  imports: [
    PrismaModule,
    SecurityModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.TOKEN_KEY,
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  exports: [UsersService],
  providers: [UsersService, RegisterUserHandler, AuthenticateHandler],
})
export class UsersModule {}
