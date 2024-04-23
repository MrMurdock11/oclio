import { ICommand } from '@nestjs/cqrs';

export class UploadPhotoCommand implements ICommand {
  constructor(
    public readonly userId: bigint,
    public readonly file: Express.Multer.File,
  ) {}
}
