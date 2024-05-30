import { ICommand } from '@nestjs/cqrs';

export class UpdateChapterCommand implements ICommand {
  constructor(
    public readonly bookId: string,
    public readonly chapterId: string,
    public readonly userId: bigint,
    public readonly title: string,
    public readonly text: string,
  ) {}
}
