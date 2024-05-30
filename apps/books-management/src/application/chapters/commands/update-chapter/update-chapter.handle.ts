import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BooksRepository } from '../../../../persistence/books.repository';
import { UpdateChapterCommand } from './update-chapter.command';

@CommandHandler(UpdateChapterCommand)
export class UpdateChapterHandler
  implements ICommandHandler<UpdateChapterCommand>
{
  constructor(private readonly _booksRepository: BooksRepository) {}

  async execute(command: UpdateChapterCommand): Promise<void> {
    const { bookId, chapterId, userId, title, text } = command;

    const book = await this._booksRepository.get(bookId, userId);

    if (!book) {
      throw new NotFoundException(`Cannot find the book by ID: ${bookId}`);
    }

    const result = book.updateChapter(chapterId, title, text);

    const updatedChapter = result.getOrThrow();
    await this._booksRepository.updateChapter(bookId, updatedChapter);
  }
}
