import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { AccessTokenGuard } from '../../presentation/guards/access-token.guard';

import { CreateBookRequest } from './dtos/create-book-request.dto';
import { CreateBookEvent } from './events/create-book.event';

@UseGuards(AccessTokenGuard)
@Controller({
  path: 'books',
  version: '1',
})
export class BooksController {
  constructor(
    @Inject('BOOKS_MANAGEMENT')
    private readonly _booksManagementClient: ClientProxy,
  ) {}

  @Post()
  public create(@Body() request: CreateBookRequest) {
    const { title, content, createdBy } = request;
    try {
      this._booksManagementClient.emit(
        'create_book',
        new CreateBookEvent(title, content, createdBy),
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
