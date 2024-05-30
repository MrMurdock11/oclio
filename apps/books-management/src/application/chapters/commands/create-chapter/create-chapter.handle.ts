import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BooksRepository } from '../../../../persistence/books.repository';
import { CreateChapterCommand } from './create-chapter.command';

@CommandHandler(CreateChapterCommand)
export class CreateChapterHandler
  implements ICommandHandler<CreateChapterCommand>
{
  constructor(private readonly _booksRepository: BooksRepository) {}

  async execute(command: CreateChapterCommand): Promise<void> {
    const { title, bookId, userId } = command;

    const book = await this._booksRepository.get(bookId, userId);

    if (!book) {
      throw new NotFoundException(`Cannot find the book by ID: ${bookId}`);
    }

    const result = book.addChapter(title);

    const createdChapter = result.getOrThrow();
    await this._booksRepository.createChapter(bookId, createdChapter);
  }
}
