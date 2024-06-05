import { ICommand } from '@nestjs/cqrs';

export class DeleteBooksCommand implements ICommand {
  constructor(
    public readonly bookIds: string[],
    public readonly userId: bigint,
  ) {}
}
