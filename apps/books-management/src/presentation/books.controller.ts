import {
  Controller,
  HttpStatus,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, RpcException } from '@nestjs/microservices';

import {
  CreateBookPayload,
  GetBookPayload,
  GetBooksPayload,
} from '@oclio/clients/books-management/payloads';
import {
  CreateBookResult,
  GetBookResult,
  GetBooksResult,
} from '@oclio/clients/books-management/results';
import { BookDto } from '@oclio/common/dto';
import { BooksManagementPattern } from '@oclio/common/enums';
import { RpcResult } from '@oclio/common/rpc-result';

import { CreateBookCommand } from '../application/books/commands/create-book/create-book.command';
import { GetBookQuery } from '../application/books/queries/get-book/get-book.query';
import { GetBooksQuery } from '../application/books/queries/get-books/get-books.query';
import { Book } from '../core/book-aggregate/book.aggregate';
import { RpcResultInterceptor } from '../shared/interceptors';

@UseInterceptors(RpcResultInterceptor)
@Controller()
export class BooksController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @MessagePattern({ cmd: BooksManagementPattern.CreateBook })
  async create(payload: CreateBookPayload): Promise<CreateBookResult> {
    const { title, userId } = payload;

    try {
      this._commandBus.execute(new CreateBookCommand(title, BigInt(userId)));

      return RpcResult.ok(HttpStatus.CREATED);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return RpcResult.fail(error.getStatus(), error.message);
      }

      if (error instanceof RpcException) {
        return RpcResult.fail(HttpStatus.BAD_REQUEST, error.message);
      }

      throw new RpcException('An error occurred while deleting the chapter');
    }
  }

  @MessagePattern({ cmd: BooksManagementPattern.GetBook })
  async get(payload: GetBookPayload): Promise<GetBookResult> {
    const { bookId, userId } = payload;

    try {
      const book = await this._queryBus.execute<GetBookQuery, Book>(
        new GetBookQuery(bookId, BigInt(userId)),
      );
      const bookDto = book.toPresentation<BookDto>();
      return RpcResult.ok(HttpStatus.OK, bookDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return RpcResult.fail(HttpStatus.NOT_FOUND, error.message);
      }

      if (error instanceof RpcException) {
        return RpcResult.fail(HttpStatus.BAD_REQUEST, error.message);
      }

      throw new RpcException('An error occurred while deleting the chapter');
    }
  }

  @MessagePattern({ cmd: BooksManagementPattern.GetBooks })
  async getAll(payload: GetBooksPayload): Promise<GetBooksResult> {
    const { userId } = payload;

    try {
      const books = await this._queryBus.execute<GetBooksQuery, Book[]>(
        new GetBooksQuery(BigInt(userId)),
      );

      const bookDtoArray = books.map((b) => b.toPresentation<BookDto>());
      return RpcResult.ok(HttpStatus.OK, bookDtoArray);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return RpcResult.fail(HttpStatus.NOT_FOUND, error.message);
      }

      if (error instanceof RpcException) {
        return RpcResult.fail(HttpStatus.NOT_FOUND, error.message);
      }

      throw new RpcException('An error occurred while deleting the chapter');
    }
  }
}
