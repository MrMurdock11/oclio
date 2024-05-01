import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';

import { CreateBookCommand } from 'src/application/books/commands/create-book/create-book.command';

import { CreateBookPayload } from './payload/create-book.payload';

@Controller()
export class BooksController {
  constructor(private readonly _commandBus: CommandBus) {}

  @MessagePattern('create_book')
  async create(payload: CreateBookPayload) {
    const { title, createdBy } = payload;

    this._commandBus.execute(new CreateBookCommand(title, createdBy));
  }
}
