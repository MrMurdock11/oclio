import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BooksRepository } from '../../../../persistence/books.repository';
import { PublishBookCommand } from './publish-book.command';

@CommandHandler(PublishBookCommand)
export class PublishBookHandler implements ICommandHandler<PublishBookCommand> {
  constructor(private readonly _booksRepository: BooksRepository) {}

  async execute(command: PublishBookCommand): Promise<any> {
    const { bookId, userId } = command;

    const book = await this._booksRepository.get(bookId, userId);
    const publishBookResult = book.publish();
    publishBookResult.getOrThrow();

    await this._booksRepository.update(book);
  }
}
