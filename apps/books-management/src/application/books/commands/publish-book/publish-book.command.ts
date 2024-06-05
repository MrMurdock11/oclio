import { ICommand } from '@nestjs/cqrs';

export class PublishBookCommand implements ICommand {
  constructor(
    public readonly bookId: string,
    public readonly userId: bigint,
  ) {}
}
