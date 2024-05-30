import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BooksRepository } from '../../../../persistence/books.repository';
import { DeleteChapterCommand } from './delete-chapter.command';

@CommandHandler(DeleteChapterCommand)
export class DeleteChapterHandler
  implements ICommandHandler<DeleteChapterCommand>
{
  constructor(private readonly _booksRepository: BooksRepository) {}

  async execute(command: DeleteChapterCommand): Promise<void> {
    const { bookId, chapterId, userId } = command;

    const book = await this._booksRepository.get(bookId, userId);

    if (!book) {
      throw new NotFoundException(`Cannot find the book by ID: ${bookId}`);
    }

    const result = book.deleteChapter(chapterId);

    result.getOrThrow();
    await this._booksRepository.deleteChapter(bookId, chapterId);
  }
}
