import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BooksRepository } from '../../../../persistence/books.repository';
import { SaveBookDetailsCommand } from './save-book-details.command';

@CommandHandler(SaveBookDetailsCommand)
export class SaveBookDetailsHandler
  implements ICommandHandler<SaveBookDetailsCommand>
{
  constructor(private readonly _booksRepository: BooksRepository) {}

  async execute(command: SaveBookDetailsCommand): Promise<any> {
    const { bookId, userId, category, genrePath, volume } = command;

    const book = await this._booksRepository.get(bookId, userId);
    const saveDetailsResult = book.saveDetails(category, genrePath, volume);
    saveDetailsResult.getOrThrow();

    await this._booksRepository.update(book);
  }
}
