import { Category } from 'apps/books-management/src/shared/enums';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SaveBookDetailsPayload {
  @IsNotEmpty()
  @IsString()
  public readonly bookId: string;

  @IsNotEmpty()
  @IsString()
  public readonly userId: string;

  @IsString()
  @IsEnum(Category)
  @IsOptional()
  public readonly category?: string;

  @IsString()
  @IsOptional()
  public readonly genrePath?: string;

  @IsInt()
  @IsOptional()
  public readonly volume?: number;

  constructor(
    bookId: string,
    userId: string,
    category?: string,
    genrePath?: string,
    volume?: number,
  ) {
    this.bookId = bookId;
    this.userId = userId;
    this.category = category;
    this.genrePath = genrePath;
    this.volume = volume;
  }
}
