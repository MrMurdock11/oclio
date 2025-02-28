import { Module } from '@nestjs/common';

import { PrismaModule } from '../../persistence/prisma/prisma.module';
import { PhotosService } from './photos.service';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  exports: [UsersService, PhotosService],
  providers: [UsersService, PhotosService],
})
export class ServicesModule {}
