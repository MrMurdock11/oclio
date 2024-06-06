import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BooksRepository } from '../../../../persistence/books.repository';
import { RearrangeChapterCommand } from './rearrange-chapter.command';

@CommandHandler(RearrangeChapterCommand)
export class RearrangeChapterHandler
  implements ICommandHandler<RearrangeChapterCommand>
{
  constructor(private readonly _booksRepository: BooksRepository) {}

  async execute(command: RearrangeChapterCommand): Promise<void> {
    const { bookId, userId, from, to } = command;

    const book = await this._booksRepository.get(bookId, userId);

    if (book === undefined) {
      throw new NotFoundException(`Cannot find the book by ID: ${bookId}`);
    }

    const result = book.rearrangeChapter(from, to);
    result.getOrThrow();

    await this._booksRepository.update(book);
  }
}
