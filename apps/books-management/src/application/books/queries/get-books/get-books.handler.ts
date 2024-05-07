import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BooksRepository } from 'apps/books-management/src/persistence/books.repository';

import { GetBooksQuery } from './get-books.query';

@QueryHandler(GetBooksQuery)
export class GetBooksHandler implements IQueryHandler<GetBooksQuery> {
  constructor(private readonly _booksRepository: BooksRepository) {}

  async execute(query: GetBooksQuery): Promise<any> {
    const { userId } = query;

    return await this._booksRepository.getAllByUserId(userId);
  }
}
