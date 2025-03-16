import { Module } from '@nestjs/common';

import { JwtConfigModule } from '@common/modules/jwt-config.module';

import { PrismaModule } from '../../persistence/prisma/prisma.module';
import { SecurityModule } from '../security/security.module';
import { AuthService } from './auth.service';
import BooksService from './books.service';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, SecurityModule, JwtConfigModule],
  exports: [UsersService, AuthService, BooksService],
  providers: [UsersService, AuthService, BooksService],
})
export class ServicesModule {}
