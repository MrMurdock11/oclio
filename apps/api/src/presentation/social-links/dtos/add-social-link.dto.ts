import { IsNotEmpty } from 'class-validator';

import { SocialLinkType } from 'src/common/enums';

export class AddSocialLinkDto {
  @IsNotEmpty()
  type: SocialLinkType;

  @IsNotEmpty()
  url: string;
}
