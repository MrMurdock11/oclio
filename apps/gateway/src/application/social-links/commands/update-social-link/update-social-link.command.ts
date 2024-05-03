import { ICommand } from '@nestjs/cqrs';

export class UpdateSocialLinkCommand implements ICommand {
  constructor(
    public readonly userId: bigint,
    public readonly socialLinkId: bigint,
    public readonly socialLinkUrl: string,
  ) {}
}
