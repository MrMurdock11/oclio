import { IsNotEmpty } from 'class-validator';

import { SocialLinkType } from '../../../common/enums';

export class AddSocialLinkDto {
  @IsNotEmpty()
  type: SocialLinkType;

  @IsNotEmpty()
  url: string;
}
