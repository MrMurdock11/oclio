import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PhotosService } from '../../../services/photos.service';
import { DeletePhotoCommand } from './delete-photo.command';

@CommandHandler(DeletePhotoCommand)
export class DeletePhotoHandler implements ICommandHandler<DeletePhotoCommand> {
  constructor(private readonly _photoService: PhotosService) {}

  async execute(command: DeletePhotoCommand) {
    const { userId } = command;

    await this._photoService.deleteByUserId(userId);
  }
}
