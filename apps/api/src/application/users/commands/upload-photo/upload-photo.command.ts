export class UploadPhotoCommand {
  constructor(
    public readonly userId: bigint,
    public readonly file: Express.Multer.File,
  ) {}
}
