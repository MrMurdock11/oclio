import { IsEmail, IsNotEmpty, Length, Min } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @Length(1, 95)
  @IsNotEmpty({ message: 'Full name is required.' })
  fullName: string;

  @IsNotEmpty({ message: 'Password is required.' })
  // @Min(8)
  password: string;
}
