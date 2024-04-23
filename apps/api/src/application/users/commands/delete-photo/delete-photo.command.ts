import { ICommand } from '@nestjs/cqrs';

export class DeletePhotoCommand implements ICommand {
  constructor(public readonly userId: bigint) {}
}
