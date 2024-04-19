import { IsEmail, IsNotEmpty, Min } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  // @Min(8)
  password: string;
}
