import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '../../persistence/prisma/prisma.module';
import { SecurityModule } from '../security/security.module';
import { ServicesModule } from '../services/services.module';
import { RegisterUserHandler } from './commands/register/register-user.handler';
import { AuthenticateHandler } from './queries/authenticate/authenticate.handler';

const QueryHandlers = [AuthenticateHandler];
const CommandHandlers = [RegisterUserHandler];

@Module({
  imports: [
    ServicesModule,
    PrismaModule,
    SecurityModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.TOKEN_KEY,
        signOptions: { expiresIn: '2d' },
      }),
    }),
  ],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class UsersModule {}
