import { Module } from '@nestjs/common';

import { PrismaModule } from '../../persistence/prisma/prisma.module';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  exports: [UsersService],
  providers: [UsersService],
})
export class ServicesModule {}
