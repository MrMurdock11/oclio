import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom, map } from 'rxjs';

import { BookDto } from '@oclio/common/dto';
import { BooksManagementPattern, Microservice } from '@oclio/common/enums';
import { RpcResult } from '@oclio/common/rpc-result';

import {
  CreateBookPayload,
  CreateChapterPayload,
  DeleteBookPayload,
  DeleteBooksPayload,
  DeleteChapterPayload,
  GetBookPayload,
  GetBooksPayload,
  PublishBookPayload,
  RearrangeChapterPayload,
  SaveBookDetailsPayload,
  UnpublishBookPayload,
  UpdateChapterPayload,
} from './payloads';
import {
  CreateBookResult,
  CreateChapterResult,
  DeleteBookResult,
  DeleteBooksResult,
  DeleteChapterResult,
  GetBookResult,
  GetBooksResult,
  PublishBookResult,
  RearrangeChapterResult,
  SaveBookDetailsResult,
  UnpublishBookResult,
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
    const books = await this.send<GetBooksResult>(
      BooksManagementPattern.SaveBookDetails,
      payload,
    );

    return books;
  }

  async deleteBook(payload: DeleteBookPayload): Promise<void> {
    const result = await firstValueFrom(
      this._client
        .send({ cmd: BooksManagementPattern.DeleteBook }, payload)
        .pipe(map<any, DeleteBookResult>(RpcResult.fromJson)),
    );

    result.getOrThrow();
  }

  async deleteBooks(payload: DeleteBooksPayload): Promise<void> {
    const result = await firstValueFrom(
      this._client
        .send({ cmd: BooksManagementPattern.DeleteBooks }, payload)
        .pipe(map<any, DeleteBooksResult>(RpcResult.fromJson)),
    );

    result.getOrThrow();
  }

  async publishBook(payload: PublishBookPayload): Promise<void> {
    const result = await firstValueFrom(
      this._client
        .send({ cmd: BooksManagementPattern.PublishBook }, payload)
        .pipe(map<any, PublishBookResult>(RpcResult.fromJson)),
    );

    result.getOrThrow();
  }

  async unpublishBook(payload: UnpublishBookPayload): Promise<void> {
    const result = await firstValueFrom(
      this._client
        .send({ cmd: BooksManagementPattern.UnpublishBook }, payload)
        .pipe(map<any, UnpublishBookResult>(RpcResult.fromJson)),
    );

    result.getOrThrow();
  }

  async saveBookDetails(payload: SaveBookDetailsPayload): Promise<void> {
    await this.send<SaveBookDetailsResult>(
      BooksManagementPattern.SaveBookDetails,
      payload,
    );
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

  async rearrangeChapter(payload: RearrangeChapterPayload): Promise<void> {
    const result = await firstValueFrom(
      this._client
        .send({ cmd: BooksManagementPattern.RearrangeChapter }, payload)
        .pipe(map<any, RearrangeChapterResult>(RpcResult.fromJson)),
    );

    result.getOrThrow();
  }

  // #endregion

  private async send<R extends RpcResult<any> = RpcResult<void>, P = any>(
    cmd: BooksManagementPattern,
    payload: P,
  ): Promise<ReturnType<R['getOrThrow']>> {
    const result = await firstValueFrom(
      this._client
        .send({ cmd }, payload)
        .pipe(map<any, R>(RpcResult.fromJson as any)),
    );

    return result.getOrThrow();
  }
}
