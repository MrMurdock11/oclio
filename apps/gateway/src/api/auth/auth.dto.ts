import { IsEmail, IsNotEmpty, Length, Min } from 'class-validator';

import { UserBasic } from '../../shared/types';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}

export type ResponseError = {
  message?: string;
};

export type SignInResponse =
  | {
      user: UserBasic;
    }
  | ResponseError;

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @Length(1, 32)
  @IsNotEmpty({ message: 'Username is required.' })
  username: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @Length(8)
  password: string;
}
