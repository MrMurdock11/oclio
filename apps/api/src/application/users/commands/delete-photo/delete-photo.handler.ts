import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { User } from '$core/user-aggregate/user.aggregate';

import { PhotosService } from '../../../services/photos.service';
import { UsersService } from '../../../services/users.service';
import { DeletePhotoCommand } from './delete-photo.command';

@CommandHandler(DeletePhotoCommand)
export class DeletePhotoHandler implements ICommandHandler<DeletePhotoCommand> {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _photoService: PhotosService,
  ) {}

  async execute(command: DeletePhotoCommand) {
    const { userId } = command;

    const user = User.fromPlain(await this._usersService.findOneById(userId));
    user.removePhoto();

    await this._photoService.deleteByUserId(user.id);
  }
}
