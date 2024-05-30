import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom, map } from 'rxjs';

import { AccessTokenGuard, ContextUser, CurrentUser } from '@oclio/common/auth';
import { BooksManagementPattern, Microservice } from '@oclio/common/enums';
import {
  CreateBookPayload,
  DeleteChapterPayload,
  GetBookPayload,
  GetBooksPayload,
  UpdateChapterPayload,
} from '@oclio/common/payloads';
import { CreateChapterPayload } from '@oclio/common/payloads/books-management/chapters/create-chapter.payload';
import {
  CreateBookResult,
  CreateChapterResult,
  DeleteChapterResult,
  GetBookResult,
  GetBooksResult,
  RpcResult,
  UpdateChapterResult,
} from '@oclio/common/results';

import { ChapterUpdateDto } from './dto/chapter-update.dto';

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

  // #region Books

  @Post()
  async create(@CurrentUser() user: ContextUser, @Body('title') title: string) {
    try {
      const result = await firstValueFrom(
        this._client
          .send(
            { cmd: BooksManagementPattern.CreateBook },
            new CreateBookPayload(title, user.id.toString()),
          )
          .pipe(map<any, CreateBookResult>((json) => RpcResult.fromJson(json))),
      );

      result.getOrThrow();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while creating the book',
      );
    }
  }

  @Get('/:id')
  async get(@Param('id') id: string, @CurrentUser() user: ContextUser) {
    try {
      const result = await firstValueFrom(
        this._client
          .send(
            { cmd: BooksManagementPattern.GetBook },
            new GetBookPayload(id, user.id.toString()),
          )
          .pipe(map<any, GetBookResult>((json) => RpcResult.fromJson(json))),
      );

      const book = result.getOrThrow();
      return book;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while getting the book',
      );
    }
  }

  @Get()
  async getAll(@CurrentUser() user: ContextUser) {
    try {
      const result = await firstValueFrom(
        this._client
          .send(
            { cmd: BooksManagementPattern.GetBooks },
            new GetBooksPayload(user.id.toString()),
          )
          .pipe(map<any, GetBooksResult>((json) => RpcResult.fromJson(json))),
      );

      const books = result.getOrThrow();
      return books;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while getting the books',
      );
    }
  }

  // #endregion

  // #region Chapters

  @Post('/:id/chapters')
  async createChapter(
    @Param('id') bookId: string,
    @CurrentUser() user: ContextUser,
    @Body('title') title: string,
  ): Promise<void> {
    try {
      const result = await firstValueFrom(
        this._client
          .send(
            { cmd: BooksManagementPattern.CreateChapter },
            new CreateChapterPayload(bookId, user.id.toString(), title),
          )
          .pipe(
            map<any, CreateChapterResult>((json) => RpcResult.fromJson(json)),
          ),
      );

      result.getOrThrow();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while creating the chapter',
      );
    }
  }

  @Put('/:bookId/chapters/:chapterId')
  async updateChapter(
    @Param('bookId') bookId: string,
    @Param('chapterId') chapterId: string,
    @CurrentUser() user: ContextUser,
    @Body() body: ChapterUpdateDto,
  ): Promise<void> {
    const { title, text } = body;

    try {
      const result = await firstValueFrom(
        this._client
          .send(
            { cmd: BooksManagementPattern.UpdateChapter },
            new UpdateChapterPayload(
              bookId,
              chapterId,
              user.id.toString(),
              title,
              text,
            ),
          )
          .pipe(
            map<any, UpdateChapterResult>((json) => RpcResult.fromJson(json)),
          ),
      );

      result.getOrThrow();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while updating the chapter',
      );
    }
  }

  @Delete('/:bookId/chapters/:chapterId')
  async deleteChapter(
    @Param('bookId') bookId: string,
    @Param('chapterId') chapterId: string,
    @CurrentUser() user: ContextUser,
  ): Promise<void> {
    try {
      const result = await firstValueFrom(
        this._client
          .send(
            { cmd: BooksManagementPattern.DeleteChapter },
            new DeleteChapterPayload(bookId, chapterId, user.id.toString()),
          )
          .pipe(
            map<any, DeleteChapterResult>((json) => RpcResult.fromJson(json)),
          ),
      );

      result.getOrThrow();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while deleting the chapter',
      );
    }
  }

  // #endregion
}
