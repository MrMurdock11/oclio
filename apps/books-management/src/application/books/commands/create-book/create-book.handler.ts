import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Book } from '$core/book-aggregate/book.aggregate';

import { BooksRepository } from '$persistence/books.repository';

import { CreateBookCommand } from './create-book.command';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  constructor(private readonly _booksRepository: BooksRepository) {}

  async execute(command: CreateBookCommand): Promise<void> {
    const { title, createdBy } = command;

    const book = Book.create(title, createdBy);
    await this._booksRepository.create({
      title: book.title,
      createdBy: book.createdBy,
    });
  }
}
