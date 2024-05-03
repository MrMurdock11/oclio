import { AggregateRoot, UNCREATED_ID } from '@oclio/common';

import { Chapter } from './chapter.model';

export class Book extends AggregateRoot {
  private _title: string;

  private _chapters: Chapter[] = [];

  private _createdBy: bigint;

  private constructor(
    id: bigint,
    title: string,
    chapters: Chapter[],
    createdBy: bigint,
  ) {
    super(id);
    this._title = title;
    this._chapters = chapters;
    this._createdBy = createdBy;
  }

  get title() {
    return this._title;
  }

  get createdBy() {
    return this._createdBy;
  }

  static create(title: string, createdBy: bigint): Book {
    return new Book(UNCREATED_ID, title, [], createdBy);
  }
}
