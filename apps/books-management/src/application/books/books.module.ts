import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../persistence/persistence.module';
import { CreateBookHandler } from './commands/create-book/create-book.handler';
import { GetBookHandler } from './queries/get-book/get-book.handler';
import { GetBooksHandler } from './queries/get-books/get-books.handler';

const QueryHandlers = [GetBookHandler, GetBooksHandler];
const CommandHandlers = [CreateBookHandler];

@Module({
  imports: [PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class BooksModule {}
