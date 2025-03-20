import { AggregateRoot } from '@common/primitives/aggregate-root';
import { BookBasic } from '@gateway/shared/types';
import { Book as PrismaBook } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';

import { User } from '../user-aggregate/user.aggregate';

class Book extends AggregateRoot<bigint> {
  @Expose({ name: 'title' })
  private _title: string;

  @Expose({ name: 'description' })
  private _description: string;

  @Expose({ name: 'author' })
  @Transform(({ value }) => value.toBasic(), { toPlainOnly: true })
  private _author: User;

  @Expose({ name: 'createdAt' })
  private _createdAt: Date;

  @Expose({ name: 'updatedAt' })
  private _updatedAt: Date;

  private constructor(
    id: bigint | null,
    uid: string | null,
    title: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    author: User,
  ) {
    super(id, uid);
    this._title = title;
    this._description = description;
    this._author = author;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  static create(user: User, title: string, description: string) {
    const book = new Book(
      null,
      null,
      title,
      description,
      new Date(),
      new Date(),
      user,
    );
    return book;
  }

  static fromPlain(plainObject: PrismaBook, author: User): Book {
    return new Book(
      plainObject.id,
      plainObject.uid,
      plainObject.title,
      plainObject.description,
      plainObject.createdAt,
      plainObject.updatedAt,
      author,
    );
  }

  toPlain(): PrismaBook {
    return {
      id: this._id,
      uid: this._uid,
      title: this._title,
      description: this._description,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      authorUid: this._author.uid,
    };
  }

  toBasic(): BookBasic {
    return {
      uid: this._uid,
      title: this._title,
      description: this._description,
      author: this._author.toBasic(),
    };
  }
}

export default Book;
