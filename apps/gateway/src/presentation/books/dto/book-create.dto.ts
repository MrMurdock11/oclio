import { IsNotEmpty, IsString } from 'class-validator';

export class BookCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}
