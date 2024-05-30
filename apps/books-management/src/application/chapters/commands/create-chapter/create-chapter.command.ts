import { ICommand } from '@nestjs/cqrs';

export class CreateChapterCommand implements ICommand {
  constructor(
    public readonly title: string,
    public readonly bookId: string,
    public readonly userId: bigint,
  ) {}
}
