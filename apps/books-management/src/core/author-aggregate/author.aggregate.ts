import { AggregateRoot } from '@oclio/common';
import { Result } from '@oclio/common/result';

import { Book } from '../book-aggregate/book.aggregate';
import { ErrorMessages } from '../shared-kernel/error-messages';

export class Author extends AggregateRoot<bigint> {
  private constructor(
    id: bigint,
    private _books: Book[] = [],
  ) {
    super(id);
  }

  get books() {
    return this._books;
  }

  static toDomain<T extends Record<string, any>>(entity: T): Author {
    const { id, books } = entity;

    return new Author(id, books);
  }

  addBook(title: string): Result<Book> {
    if (!title || !this._id || this._id === 0n) {
      return Result.fail(ErrorMessages.Book.InvalidArgumentsToCreateBook);
    }

    if (this._books.some((b) => b.title === title)) {
      return Result.fail('Cannot create a book with an existing title.');
    }

    const book = Book.create(title, this._id);
    this._books.push(book);
    return Result.ok(book);
  }

  deleteBook(bookId: string): Result<string> {
    if (!bookId) {
      return Result.fail('The book ID cannot be undefined.');
    }

    const deletedBookIndex = this._books.findIndex((b) => b.id === bookId);
    if (deletedBookIndex === -1) {
      return Result.fail(
        `Cannot find the book with the specified ID: ${bookId}.`,
      );
    }

    this._books.splice(deletedBookIndex, 1);
    return Result.ok(bookId);
  }

  deleteBooks(bookIds: string[]): Result<string[]> {
    if (!bookIds || bookIds.length === 0) {
      return Result.fail('The book IDs cannot be empty or undefined.');
    }

    const errors: string[] = [];

    bookIds.forEach((bookId) => {
      const deletedBookIndex = this._books.findIndex((b) => b.id === bookId);
      if (deletedBookIndex === -1) {
        errors.push(`Cannot find the book with ID: ${bookId}`);
      } else {
        this._books.splice(deletedBookIndex, 1);
      }
    });

    if (errors.length > 0) {
      return Result.fail(errors.join('; '));
    }

    return Result.ok(bookIds);
  }
}
