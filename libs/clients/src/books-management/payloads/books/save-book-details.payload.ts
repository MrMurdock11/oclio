import { Category } from 'apps/books-management/src/shared/enums';
import {
  IsArray,
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

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public readonly genrePaths?: string[];

  @IsInt()
  @IsOptional()
  public readonly volume?: number;

  constructor(
    bookId: string,
    userId: string,
    category?: string,
    genrePaths?: string[],
    volume?: number,
  ) {
    this.bookId = bookId;
    this.userId = userId;
    this.category = category;
    this.genrePaths = genrePaths;
    this.volume = volume;
  }
}
