import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Author } from '../../../../core/author-aggregate/author.aggregate';
import { BooksRepository } from '../../../../persistence/books.repository';
import { CreateBookCommand } from './create-book.command';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(private readonly _booksRepository: BooksRepository) {}

  async execute(command: CreateBookCommand): Promise<void> {
    const { title, userId } = command;

    const author = Author.toDomain({ id: userId });
    const addBookResult = author.addBook(title);
    const createdBook = addBookResult.getOrThrow();
    await this._booksRepository.create(createdBook);
  }
}
