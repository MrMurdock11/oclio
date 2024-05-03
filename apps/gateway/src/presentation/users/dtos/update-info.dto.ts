import { IsNotEmpty, Length } from 'class-validator';

export class UpdateInfoDto {
  @IsNotEmpty()
  @Length(1, 95)
  fullName: string;

  @IsNotEmpty()
  bio: string;
}
