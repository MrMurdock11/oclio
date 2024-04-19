import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  InternalServerErrorException,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';

import { DeletePhotoCommand } from '$application/users/commands/delete-photo/delete-photo.command';
import { UpdateInfoCommand } from '$application/users/commands/update-info/update-info.command';
import { UploadPhotoCommand } from '$application/users/commands/upload-photo/upload-photo.command';

import { CurrentUser } from 'src/common/decorators';
import { ContextUser } from 'src/common/interfaces';

import { AccessTokenGuard } from '../guards/access-token.guard';
import { UpdateInfoDto } from './dtos/update-info.dto';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly _commandBus: CommandBus) {}

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AccessTokenGuard)
  @Post('photo')
  async uploadPhoto(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: process.env.PERMITTED_PHOTO_FILE_EXTS,
          }),
          new MaxFileSizeValidator({
            maxSize: Number.parseInt(process.env.MAX_PHOTO_SIZE_BYTES),
            message: 'The photo exceeds the maximum allowed size.',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @CurrentUser() user: ContextUser,
  ) {
    try {
      await this._commandBus.execute(
        new UploadPhotoCommand(BigInt(user.id), file),
      );
    } catch (err) {
      throw new InternalServerErrorException(
        'An error occurred while processing your request.',
      );
    }
  }

  @UseGuards(AccessTokenGuard)
  @Delete('photo')
  async deletePhoto(@CurrentUser() user: ContextUser) {
    try {
      await this._commandBus.execute(new DeletePhotoCommand(BigInt(user.id)));
    } catch (err) {
      throw new InternalServerErrorException(
        'An error occurred while processing your request.',
      );
    }
  }

  @UseGuards(AccessTokenGuard)
  @Put('info')
  updateInfo(@Body() dto: UpdateInfoDto, @CurrentUser() user: ContextUser) {
    const { fullName, bio } = dto;

    try {
      const command = new UpdateInfoCommand(BigInt(user.id), fullName, bio);
      this._commandBus.execute(command);
    } catch (err) {
      throw new InternalServerErrorException(
        'An error occurred while processing your request.',
      );
    }
  }
}
