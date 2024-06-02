import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChapterPayload {
  @IsString()
  @IsNotEmpty()
  public readonly bookId: string;

  @IsString()
  @IsNotEmpty()
  public readonly userId: string;

  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  constructor(bookId: string, userId: string, title: string) {
    this.bookId = bookId;
    this.userId = userId;
    this.title = title;
  }
}
