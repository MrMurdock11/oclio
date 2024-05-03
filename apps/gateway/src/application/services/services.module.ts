import { Module } from '@nestjs/common';

import { PrismaModule } from '../../persistence/prisma/prisma.module';

import { PhotosService } from './photos.service';
import { SocialLinksService } from './social-links.service';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  exports: [UsersService, PhotosService, SocialLinksService],
  providers: [UsersService, PhotosService, SocialLinksService],
})
export class ServicesModule {}
