import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateChapterPayload {
  @IsString()
  @IsNotEmpty()
  public readonly bookId: string;

  @IsString()
  @IsNotEmpty()
  public readonly chapterId: string;

  @IsString()
  @IsNotEmpty()
  public readonly userId: string;

  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  @IsString()
  public readonly text: string;

  constructor(
    bookId: string,
    chapterId: string,
    userId: string,
    title: string,
    text: string,
  ) {
    this.bookId = bookId;
    this.chapterId = chapterId;
    this.userId = userId;
    this.title = title;
    this.text = text;
  }
}
