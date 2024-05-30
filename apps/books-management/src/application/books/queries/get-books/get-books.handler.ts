import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Book } from '../../../../core/book-aggregate/book.aggregate';
import { BooksRepository } from '../../../../persistence/books.repository';
import { GetBooksQuery } from './get-books.query';

@QueryHandler(GetBooksQuery)
export class GetBooksHandler implements IQueryHandler<GetBooksQuery> {
  constructor(private readonly _booksRepository: BooksRepository) {}

  async execute(query: GetBooksQuery): Promise<Book[]> {
    const { userId } = query;

    return await this._booksRepository.getAll(userId);
  }
}
