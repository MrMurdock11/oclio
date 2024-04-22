import { IsNotEmpty } from 'class-validator';

export class UpdateSocialLinkDto {
  @IsNotEmpty()
  url: string;
}
