import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Book } from '../../../../core/book-aggregate/book.aggregate';
import { BooksRepository } from '../../../../persistence/books.repository';
import { GetBookQuery } from './get-book.query';

@QueryHandler(GetBookQuery)
export class GetBookHandler implements IQueryHandler<GetBookQuery> {
  constructor(private readonly _booksRepository: BooksRepository) {}

  async execute(query: GetBookQuery): Promise<Book> {
    const { bookId, userId } = query;

    return await this._booksRepository.get(bookId, userId);
  }
}
