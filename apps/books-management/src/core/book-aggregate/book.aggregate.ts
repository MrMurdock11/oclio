import { AggregateRoot, UNCREATED_ID } from '@oclio/common';
import { Result } from '@oclio/common/result';

import { BookStatus } from '../../shared/enums';
import { ErrorMessages } from '../shared-kernel/error-messages';
import { Chapter } from './chapter.model';

export class Book extends AggregateRoot<string> {
  private _title: string;

  private _chapters: Chapter[] = [];

  private _status: BookStatus;

  private _createdAt: Date;

  private _updatedAt?: Date;

  private _createdBy?: bigint;

  private constructor(
    id: string,
    title: string,
    chapters: Chapter[],
    createdBy: bigint,
    status: BookStatus,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id);
    this._title = title;
    this._chapters = chapters;
    this._createdBy = createdBy;
    this._status = status;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get title() {
    return this._title;
  }

  get chapters() {
    return this._chapters;
  }

  get createdBy() {
    return this._createdBy;
  }

  get status() {
    return this._status;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this.updatedAt;
  }

  static create(title: string, createdBy: bigint): Result<Book> {
    if (!title || !createdBy || createdBy === 0n) {
      return Result.fail(ErrorMessages.Book.InvalidArgumentsToCreateBook);
    }

    return Result.ok(
      new Book(
        UNCREATED_ID,
        title,
        [Chapter.create('Chapter Title', 'Chapter Text')],
        createdBy,
        BookStatus.Draft,
      ),
    );
  }

  static toDomain<Entity extends Record<string, any>>(
    entity: Entity,
  ): Result<Book> {
    if (!entity) {
      return Result.fail(ErrorMessages.Book.EntityIsEmpty);
    }

    return Result.ok(this.mapToDomain(entity));
  }

  static toDomainArray<Entity extends Record<string, any>[]>(
    entities: Entity,
  ): Result<Book[]> {
    if (!entities) {
      return Result.fail(ErrorMessages.Book.EntityIsEmpty);
    }

    return Result.ok(entities.map(this.mapToDomain));
  }

  toPresentation<T extends Record<string, any>>(): T {
    return {
      id: this._id,
      title: this._title,
      status: this._status,
      // chapters: this._chapters.map((c) => c.toPresentation()),
      createdBy: this._createdBy.toString(),
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    } as unknown as T;
  }

  toPersistence<T extends Record<string, any>>(): T {
    return {
      id: this._id,
      title: this._title,
      status: this._status,
      chapters: this._chapters.map((c) => c.toPresentation()),
      createdBy: this._createdBy,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    } as unknown as T;
  }

  private static mapToDomain<T extends Record<string, any>>(entity: T): Book {
    const { id, title, chapters, createdBy, status, createdAt, updatedAt } =
      entity;

    return new Book(
      id,
      title,
      chapters.map(Chapter.toDomain),
      createdBy,
      status,
      createdAt,
      updatedAt,
    );
  }
}
