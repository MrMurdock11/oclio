import { ICommand } from '@nestjs/cqrs';

export class CreateBookCommand implements ICommand {
  constructor(
    public readonly title: string,
    public readonly userId: bigint,
  ) {}
}
