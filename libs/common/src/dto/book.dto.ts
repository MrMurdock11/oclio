import { BookStatus } from '../../../../apps/books-management/src/shared/enums';
import { ChapterDto } from './chapter.dto';

export interface BookDto {
  title: string;

  chapters: ChapterDto[];

  status: BookStatus;

  createdAt: Date;

  updatedAt?: Date;

  createdBy?: bigint;
}
