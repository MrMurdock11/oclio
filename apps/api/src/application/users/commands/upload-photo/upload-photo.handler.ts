import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { User } from '$core/user-aggregate/user.aggregate';

import { PhotosService } from '../../../services/photos.service';
import { UsersService } from '../../../services/users.service';
import { UploadPhotoCommand } from './upload-photo.command';

@CommandHandler(UploadPhotoCommand)
export class UploadPhotoHandler implements ICommandHandler<UploadPhotoCommand> {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _photoService: PhotosService,
  ) {}

  async execute(command: UploadPhotoCommand) {
    const { userId, file } = command;
    const userEntity = await this._usersService.findOneById(userId);
    const user = User.fromPlain(userEntity);
    user.addPhoto(file);

    await this._photoService.create({
      base64: user.photo.base64,
      userId: user.id,
    });
  }
}
