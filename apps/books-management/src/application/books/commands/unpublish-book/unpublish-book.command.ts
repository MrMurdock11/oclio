import { ICommand } from '@nestjs/cqrs';

export class UnpublishBookCommand implements ICommand {
  constructor(
    public readonly bookId: string,
    public readonly userId: bigint,
  ) {}
}
