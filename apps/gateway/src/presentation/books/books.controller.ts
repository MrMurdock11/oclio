import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom, map } from 'rxjs';

import { AccessTokenGuard, ContextUser, CurrentUser } from '@oclio/common/auth';
import { BooksManagementPattern, Microservice } from '@oclio/common/enums';
import {
  CreateBookPayload,
  GetBookPayload,
  GetBooksPayload,
} from '@oclio/common/payloads';
import { GetBookResult, GetBooksResult } from '@oclio/common/results';

import { CreateBookRequest } from './dtos/create-book-request.dto';

@UseGuards(AccessTokenGuard)
@Controller({
  path: 'books',
  version: '1',
})
export class BooksController {
  constructor(
    @Inject(Microservice.BooksManagement)
    private readonly _client: ClientProxy,
  ) {}

  @Post()
  async create(
    @Body() request: CreateBookRequest,
    @CurrentUser() user: ContextUser,
  ) {
    const { title } = request;

    try {
      this._client
        .send(
          { cmd: BooksManagementPattern.CreateBook },
          new CreateBookPayload(title, user.id.toString()),
        )
        .subscribe();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('/:id')
  async get(@Param('id') id: string) {
    try {
      const book = await firstValueFrom(
        this._client
          .send<GetBookResult>(
            { cmd: BooksManagementPattern.GetBook },
            new GetBookPayload(id),
          )
          .pipe(map((result) => result.book)),
      );
      return book;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  async getAllByUserId(@CurrentUser() user: ContextUser) {
    try {
      return await firstValueFrom(
        this._client
          .send<GetBooksResult>(
            { cmd: BooksManagementPattern.GetBooks },
            new GetBooksPayload(user.id.toString()),
          )
          .pipe(map((result) => result.books)),
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
