import { Controller, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';

import { BooksManagementPattern } from '@oclio/common/enums';
import {
  CreateBookPayload,
  GetBookPayload,
  GetBooksPayload,
} from '@oclio/common/payloads';

import { CreateBookCommand } from '../application/books/commands/create-book/create-book.command';
import { GetBookQuery } from '../application/books/queries/get-book/get-book.query';
import { GetBooksQuery } from '../application/books/queries/get-books/get-books.query';
import { Book } from '../core/book-aggregate/book.aggregate';

@Controller()
export class BooksController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: BooksManagementPattern.CreateBook })
  async create(payload: CreateBookPayload) {
    const { title, userId } = payload;

    try {
      this._commandBus.execute(new CreateBookCommand(title, BigInt(userId)));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @MessagePattern({ cmd: BooksManagementPattern.GetBook })
  async get(payload: GetBookPayload) {
    const { bookId } = payload;

    try {
      const book = await this._queryBus.execute<GetBookQuery, Book>(
        new GetBookQuery(bookId),
      );
      return { book: book.toPresentation() };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @MessagePattern({ cmd: BooksManagementPattern.GetBooks })
  async getAllByUserId(payload: GetBooksPayload) {
    const { userId } = payload;

    try {
      const books = await this._queryBus.execute<GetBooksQuery, Book[]>(
        new GetBooksQuery(BigInt(userId)),
      );

      return { books: books.map((b) => b.toPresentation()) };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
