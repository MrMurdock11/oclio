import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Author } from '../../../../core/author-aggregate/author.aggregate';
import { BooksRepository } from '../../../../persistence/books.repository';
import { DeleteBooksCommand } from './delete-books.command';

@CommandHandler(DeleteBooksCommand)
export class DeleteBooksHandler implements ICommandHandler<DeleteBooksCommand> {
  constructor(private readonly _booksRepository: BooksRepository) {}

  async execute(command: DeleteBooksCommand): Promise<void> {
    const { bookIds, userId } = command;

    const books = await this._booksRepository.getAll(userId);
    const author = Author.toDomain({ id: userId, books });

    const deleteBooksResult = author.deleteBooks(bookIds);
    const deletedBookIds = deleteBooksResult.getOrThrow();
    await this._booksRepository.delete(deletedBookIds);
  }
}
