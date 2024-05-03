import { ICommand } from '@nestjs/cqrs';

export class UpdateInfoCommand implements ICommand {
  constructor(
    public readonly userId: bigint,
    public readonly fullName: string,
    public readonly bio: string,
  ) {}
}
