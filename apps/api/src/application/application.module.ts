import { Module } from '@nestjs/common';
import { SecurityModule } from './security/security.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from 'src/core/core.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SecurityModule,
    UsersModule,
    CoreModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.TOKEN_KEY,
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
})
export class ApplicationModule {}
