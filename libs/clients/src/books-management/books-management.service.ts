import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom, map } from 'rxjs';

import { BookDto } from '@oclio/common/dto';
import { BooksManagementPattern, Microservice } from '@oclio/common/enums';
import { RpcResult } from '@oclio/common/rpc-result';

import {
  CreateBookPayload,
  CreateChapterPayload,
  DeleteChapterPayload,
  GetBookPayload,
  GetBooksPayload,
  UpdateChapterPayload,
} from './payloads';
import {
  CreateBookResult,
  CreateChapterResult,
  DeleteChapterResult,
  GetBookResult,
  GetBooksResult,
  UpdateChapterResult,
} from './results';

@Injectable()
export class BooksManagementService {
  constructor(
    @Inject(Microservice.BooksManagement)
    private readonly _client: ClientProxy,
  ) {}

  // #region Books

  async createBook(payload: CreateBookPayload): Promise<void> {
    const result = await firstValueFrom(
      this._client
        .send({ cmd: BooksManagementPattern.CreateBook }, payload)
        .pipe(map<any, CreateBookResult>(RpcResult.fromJson)),
    );

    result.getOrThrow();
  }

  async getBook(payload: GetBookPayload): Promise<BookDto> {
    const result = await firstValueFrom(
      this._client
        .send({ cmd: BooksManagementPattern.GetBook }, payload)
        .pipe(map<any, GetBookResult>(RpcResult.fromJson)),
    );

    const book = result.getOrThrow();
    return book;
  }

  async getAllBooks(payload: GetBooksPayload): Promise<BookDto[]> {
    const result = await firstValueFrom(
      this._client
        .send({ cmd: BooksManagementPattern.GetBooks }, payload)
        .pipe(map<any, GetBooksResult>(RpcResult.fromJson)),
    );

    const books = result.getOrThrow();
    return books;
  }

  // #endregion

  // #region Chapters

  async createChapter(payload: CreateChapterPayload): Promise<void> {
    const result = await firstValueFrom(
      this._client
        .send({ cmd: BooksManagementPattern.CreateChapter }, payload)
        .pipe(map<any, CreateChapterResult>(RpcResult.fromJson)),
    );

    result.getOrThrow();
  }

  async updateChapter(payload: UpdateChapterPayload): Promise<void> {
    const result = await firstValueFrom(
      this._client
        .send({ cmd: BooksManagementPattern.UpdateChapter }, payload)
        .pipe(map<any, UpdateChapterResult>(RpcResult.fromJson)),
    );

    result.getOrThrow();
  }

  async deleteChapter(payload: DeleteChapterPayload): Promise<void> {
    const result = await firstValueFrom(
      this._client
        .send({ cmd: BooksManagementPattern.DeleteChapter }, payload)
        .pipe(map<any, DeleteChapterResult>(RpcResult.fromJson)),
    );

    result.getOrThrow();
  }

  // #endregion
}
