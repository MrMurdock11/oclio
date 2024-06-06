import { ICommand } from '@nestjs/cqrs';

export class RearrangeChapterCommand implements ICommand {
  constructor(
    public readonly bookId: string,
    public readonly userId: bigint,
    public readonly from: number,
    public readonly to: number,
  ) {}
}
