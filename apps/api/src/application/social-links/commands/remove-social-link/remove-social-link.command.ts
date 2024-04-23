import { ICommand } from '@nestjs/cqrs';

export class RemoveSocialLinkCommand implements ICommand {
  constructor(
    public readonly userId: bigint,
    public readonly socialLinkId: bigint,
  ) {}
}
