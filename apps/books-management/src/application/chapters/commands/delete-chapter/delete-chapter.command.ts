import { ICommand } from '@nestjs/cqrs';

export class DeleteChapterCommand implements ICommand {
  constructor(
    public readonly bookId: string,
    public readonly chapterId: string,
    public readonly userId: bigint,
  ) {}
}
