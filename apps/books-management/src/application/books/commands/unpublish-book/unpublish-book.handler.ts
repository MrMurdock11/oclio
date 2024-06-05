import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BooksRepository } from '../../../../persistence/books.repository';
import { UnpublishBookCommand } from './unpublish-book.command';

@CommandHandler(UnpublishBookCommand)
export class UnpublishBookHandler
  implements ICommandHandler<UnpublishBookCommand>
{
  constructor(private readonly _booksRepository: BooksRepository) {}

  async execute(command: UnpublishBookCommand): Promise<any> {
    const { bookId, userId } = command;

    const book = await this._booksRepository.get(bookId, userId);
    const unpublishBookResult = book.unpublish();
    unpublishBookResult.getOrThrow();

    await this._booksRepository.update(book);
  }
}
