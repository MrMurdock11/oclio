import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Author } from '../../../../core/author-aggregate/author.aggregate';
import { BooksRepository } from '../../../../persistence/books.repository';
import { DeleteBookCommand } from './delete-book.command';

@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeleteBookCommand> {
  constructor(private readonly _booksRepository: BooksRepository) {}

  async execute(command: DeleteBookCommand): Promise<void> {
    const { bookId, userId } = command;

    const books = await this._booksRepository.getAll(userId);
    const author = Author.toDomain({ id: userId, books });

    const deleteBookResult = author.deleteBook(bookId);
    const deletedBookId = deleteBookResult.getOrThrow();
    await this._booksRepository.delete([deletedBookId]);
  }
}
