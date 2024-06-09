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
  DeleteBookPayload,
  DeleteBooksPayload,
  GetBookPayload,
  GetBooksPayload,
  PublishBookPayload,
  SaveBookDetailsPayload,
  UnpublishBookPayload,
} from '@oclio/clients/books-management/payloads';
import {
  CreateBookResult,
  DeleteBookResult,
  DeleteBooksResult,
  GetBookResult,
  GetBooksResult,
  PublishBookResult,
  SaveBookDetailsResult,
  UnpublishBookResult,
} from '@oclio/clients/books-management/results';
import { BookDto } from '@oclio/common/dto';
import { BooksManagementPattern } from '@oclio/common/enums';
import { RpcResult } from '@oclio/common/rpc-result';

import { CreateBookCommand } from '../application/books/commands/create-book/create-book.command';
import { DeleteBookCommand } from '../application/books/commands/delete-book/delete-book.command';
import { DeleteBooksCommand } from '../application/books/commands/delete-books/delete-books.command';
import { PublishBookCommand } from '../application/books/commands/publish-book/publish-book.command';
import { SaveBookDetailsCommand } from '../application/books/commands/save-book-details/save-book-details.command';
import { UnpublishBookCommand } from '../application/books/commands/unpublish-book/unpublish-book.command';
import { GetBookQuery } from '../application/books/queries/get-book/get-book.query';
import { GetBooksQuery } from '../application/books/queries/get-books/get-books.query';
import { Book } from '../core/book-aggregate/book.aggregate';
import { Category } from '../shared/enums';
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
      await this._commandBus.execute(
        new CreateBookCommand(title, BigInt(userId)),
      );

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

  @MessagePattern({ cmd: BooksManagementPattern.DeleteBook })
  async deleteBook(payload: DeleteBookPayload): Promise<DeleteBookResult> {
    const { bookId, userId } = payload;

    try {
      await this._commandBus.execute(
        new DeleteBookCommand(bookId, BigInt(userId)),
      );
      return RpcResult.ok(HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return RpcResult.fail(HttpStatus.NOT_FOUND, error.message);
      }

      if (error instanceof RpcException) {
        return RpcResult.fail(HttpStatus.BAD_REQUEST, error.message);
      }

      throw new RpcException('An error occurred while deleting the book');
    }
  }

  @MessagePattern({ cmd: BooksManagementPattern.DeleteBooks })
  async deleteBooks(payload: DeleteBooksPayload): Promise<DeleteBooksResult> {
    const { bookIds, userId } = payload;

    try {
      await this._commandBus.execute(
        new DeleteBooksCommand(bookIds, BigInt(userId)),
      );
      return RpcResult.ok(HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return RpcResult.fail(HttpStatus.NOT_FOUND, error.message);
      }

      if (error instanceof RpcException) {
        return RpcResult.fail(HttpStatus.BAD_REQUEST, error.message);
      }

      throw new RpcException('An error occurred while deleting the books');
    }
  }

  @MessagePattern({ cmd: BooksManagementPattern.PublishBook })
  async publishBook(payload: PublishBookPayload): Promise<PublishBookResult> {
    const { bookId, userId } = payload;

    try {
      await this._commandBus.execute(
        new PublishBookCommand(bookId, BigInt(userId)),
      );
      return RpcResult.ok(HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return RpcResult.fail(HttpStatus.NOT_FOUND, error.message);
      }

      if (error instanceof RpcException) {
        return RpcResult.fail(HttpStatus.BAD_REQUEST, error.message);
      }

      throw new RpcException('An error occurred while publish the book');
    }
  }

  @MessagePattern({ cmd: BooksManagementPattern.UnpublishBook })
  async unpublishBook(
    payload: UnpublishBookPayload,
  ): Promise<UnpublishBookResult> {
    const { bookId, userId } = payload;

    try {
      await this._commandBus.execute(
        new UnpublishBookCommand(bookId, BigInt(userId)),
      );
      return RpcResult.ok(HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return RpcResult.fail(HttpStatus.NOT_FOUND, error.message);
      }

      if (error instanceof RpcException) {
        return RpcResult.fail(HttpStatus.BAD_REQUEST, error.message);
      }

      throw new RpcException('An error occurred while unpublish the book');
    }
  }

  @MessagePattern({ cmd: BooksManagementPattern.SaveBookDetails })
  async saveBookDetails(
    payload: SaveBookDetailsPayload,
  ): Promise<SaveBookDetailsResult> {
    const { bookId, userId, category, genrePaths, volume } = payload;

    try {
      await this._commandBus.execute(
        new SaveBookDetailsCommand(
          bookId,
          BigInt(userId),
          category as Category,
          genrePaths,
          volume,
        ),
      );
      return RpcResult.ok(HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return RpcResult.fail(HttpStatus.NOT_FOUND, error.message);
      }

      if (error instanceof RpcException) {
        return RpcResult.fail(HttpStatus.BAD_REQUEST, error.message);
      }

      throw new RpcException('An error occurred while saving the book details');
    }
  }
}
