import { ICommand } from '@nestjs/cqrs';

import { SocialLinkType } from 'src/common/enums';

export class AddSocialLinkCommand implements ICommand {
  constructor(
    public readonly userId: bigint,
    public readonly socialLinkType: SocialLinkType,
    public readonly socialLinkUrl: string,
  ) {}
}
