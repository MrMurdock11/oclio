import { BookStatus } from '../../shared/enums';

export class CreateBookDto {
  title: string;
  chapters: { title: string; text: string }[];
  status: BookStatus;
  createdBy: bigint;
}
