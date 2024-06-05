import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../persistence/persistence.module';
import { CreateBookHandler } from './commands/create-book/create-book.handler';
import { DeleteBookHandler } from './commands/delete-book/delete-book.handler';
import { DeleteBooksHandler } from './commands/delete-books/delete-books.handler';
import { GetBookHandler } from './queries/get-book/get-book.handler';
import { GetBooksHandler } from './queries/get-books/get-books.handler';

const QueryHandlers = [GetBookHandler, GetBooksHandler];
const CommandHandlers = [
  CreateBookHandler,
  DeleteBookHandler,
  DeleteBooksHandler,
];

@Module({
  imports: [PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class BooksModule {}
