import { AggregateRoot, UNCREATED_ID } from '@oclio/common';
import { Result } from '@oclio/common/result';

import { BookStatus, Category } from '../../shared/enums';
import { genres, validateGenrePath } from '../../shared/genres';
import { ErrorMessages } from '../shared-kernel/error-messages';
import { Chapter } from './chapter.model';
import { Details } from './value-objects/details.vo';

export class Book extends AggregateRoot<string> {
  private _title: string;

  private _chapters: Chapter[] = [];

  private _details?: Details;

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
    details?: Details,
  ) {
    super(id);
    this._title = title;
    this._chapters = chapters;
    this._details = details ?? Details.create();
    this._createdBy = createdBy;
    this._status = status;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  // #region Getters

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

  // #endregion

  addChapter(title: string): Result<Chapter> {
    if (!title) {
      return Result.fail(ErrorMessages.Book.InvalidArgumentsToCreateChapter);
    }

    const newChapter = Chapter.create(title, '');
    this._chapters.push(newChapter);

    return Result.ok(newChapter);
  }

  updateChapter(
    chapterId: string,
    title?: string,
    text?: string,
  ): Result<Chapter> {
    const chapter = this.chapters.find((c) => c.id === chapterId);
    if (!chapter) {
      return Result.fail(`Not found chapter by ID ${chapterId}`);
    }

    chapter.update(title, text);
    return Result.ok(chapter);
  }

  deleteChapter(chapterId: string): Result<void> {
    const index = this._chapters.findIndex((ch) => ch.id === chapterId);
    if (index === -1) {
      return Result.fail(`Not found chapter by ID ${chapterId}`);
    }
    this._chapters.splice(index, 1);
    return Result.ok();
  }

  rearrangeChapter(from: number, to: number): Result<void> {
    const isNegative = from < 0 || to < 0;
    const isEmpty = from === undefined || to === undefined;
    if (isEmpty || from === to || isNegative) {
      return Result.fail('Invalid arguments to rearrange chapters');
    }

    this._chapters.splice(to, 0, this._chapters.splice(from, 1)[0]);
    return Result.ok();
  }

  publish(): Result<void> {
    if (this._id === undefined) {
      return Result.fail(ErrorMessages.Book.CannotPublishUncreatedBook);
    }

    if (this._status === BookStatus.Published) {
      return Result.fail('Cannot publish a published book.');
    }

    this._status = BookStatus.Published;
    return Result.ok();
  }

  unpublish(): Result<void> {
    if (this._id === undefined) {
      return Result.fail(ErrorMessages.Book.CannotUnpublishUncreatedBook);
    }

    if (this._status === BookStatus.Draft) {
      return Result.fail('Cannot unpublish a draft.');
    }

    this._status = BookStatus.Draft;
    return Result.ok();
  }

  saveDetails(
    category?: Category,
    genrePaths?: string[],
    volume?: number,
  ): Result<void> {
    const isCategoryAndGenreNonEmpty =
      category !== undefined && genrePaths !== undefined;
    const isInvalidGenrePaths = !genrePaths.every((genrePath) =>
      validateGenrePath(genres[category], genrePath.split('/')),
    );
    if (isCategoryAndGenreNonEmpty && isInvalidGenrePaths) {
      return Result.fail('Genre path is invalid.');
    }

    this._details = Details.create(category, genrePaths, volume);
    return Result.ok();
  }

  static create(title: string, createdBy: bigint): Book {
    return new Book(
      UNCREATED_ID,
      title,
      [Chapter.create('Chapter Title', 'Chapter Text')],
      createdBy,
      BookStatus.Draft,
    );
  }

  static toDomain<T extends Record<string, any>>(entity: T): Book {
    const {
      id,
      title,
      details,
      chapters,
      createdBy,
      status,
      createdAt,
      updatedAt,
    } = entity;

    return new Book(
      id,
      title,
      chapters.map(Chapter.toDomain),
      createdBy,
      status,
      createdAt,
      updatedAt,
      details,
    );
  }

  toPresentation<T extends Record<string, any>>(): T {
    return {
      id: this._id,
      title: this._title,
      status: this._status,
      details: this._details.toPresentation(),
      chapters: this._chapters.map((c) => c.toPresentation()),
      createdBy: this._createdBy.toString(),
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    } as unknown as T;
  }

  toPersistence<T extends Record<string, any>>(): T {
    return {
      title: this._title,
      status: this._status,
      details: this._details.toPersistence(),
      chapters: this._chapters.map((c) => c.toPersistence()),
      createdBy: this._createdBy,
    } as unknown as T;
  }
}
