import { ICommand } from '@nestjs/cqrs';

export class DeleteBookCommand implements ICommand {
  constructor(
    public readonly bookId: string,
    public readonly userId: bigint,
  ) {}
}
