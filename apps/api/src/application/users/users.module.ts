import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '$persistence/prisma/prisma.module';

import { SecurityModule } from '../security/security.module';
import { PhotosService } from '../services/photos.service';
import { DeletePhotoHandler } from './commands/delete-photo/delete-photo.handler';
import { RegisterUserHandler } from './commands/register/register-user.handler';
import { UpdateInfoHandler } from './commands/update-info/update-info.handler';
import { UploadPhotoHandler } from './commands/upload-photo/upload-photo.handler';
import { AuthenticateHandler } from './queries/authenticate/authenticate.handler';
import { UsersService } from './users.service';

@Module({
  imports: [
    PrismaModule,
    SecurityModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.TOKEN_KEY,
        signOptions: { expiresIn: '2d' },
      }),
    }),
  ],
  exports: [UsersService, PhotosService],
  providers: [
    UsersService,
    PhotosService,
    RegisterUserHandler,
    UpdateInfoHandler,
    AuthenticateHandler,
    UploadPhotoHandler,
    DeletePhotoHandler,
  ],
})
export class UsersModule {}
