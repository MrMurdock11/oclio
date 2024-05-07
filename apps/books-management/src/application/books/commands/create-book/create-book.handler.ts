import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Book } from '../../../../core/book-aggregate/book.aggregate';
import { BooksRepository } from '../../../../persistence/books.repository';
import { CreateBookCommand } from './create-book.command';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(private readonly _booksRepository: BooksRepository) {}

  async execute(command: CreateBookCommand): Promise<void> {
    const { title, userId } = command;

    const result = Book.create(title, userId);
    if (result.isSuccess()) {
      await this._booksRepository.create(result.value);
    } else if (result.isFailure()) {
      throw new Error(result.error);
    }
  }
}
