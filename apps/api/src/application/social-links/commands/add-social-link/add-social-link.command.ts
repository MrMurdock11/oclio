import { SocialLinkType } from 'src/common/enums';

export class AddSocialLinkCommand {
  constructor(
    public readonly userId: bigint,
    public readonly socialLinkType: SocialLinkType,
    public readonly socialLinkUrl: string,
  ) {}
}
