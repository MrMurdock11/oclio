import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PhotosService } from '../../../services/photos.service';
import { UploadPhotoCommand } from './upload-photo.command';

@CommandHandler(UploadPhotoCommand)
export class UploadPhotoHandler implements ICommandHandler<UploadPhotoCommand> {
  constructor(private readonly _photoService: PhotosService) {}

  async execute(command: UploadPhotoCommand) {
    const { userId, file } = command;

    await this._photoService.create({
      base64: file.buffer.toString('base64'),
      userId,
    });
  }
}
