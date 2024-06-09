import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../persistence/persistence.module';
import { CreateBookHandler } from './commands/create-book/create-book.handler';
import { DeleteBookHandler } from './commands/delete-book/delete-book.handler';
import { DeleteBooksHandler } from './commands/delete-books/delete-books.handler';
import { PublishBookHandler } from './commands/publish-book/publish-book.handler';
import { SaveBookDetailsHandler } from './commands/save-book-details/save-book-details.handler';
import { UnpublishBookHandler } from './commands/unpublish-book/unpublish-book.handler';
import { GetBookHandler } from './queries/get-book/get-book.handler';
import { GetBooksHandler } from './queries/get-books/get-books.handler';

const QueryHandlers = [GetBookHandler, GetBooksHandler];
const CommandHandlers = [
  CreateBookHandler,
  DeleteBookHandler,
  DeleteBooksHandler,
  PublishBookHandler,
  UnpublishBookHandler,
  SaveBookDetailsHandler,
];

@Module({
  imports: [PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class BooksModule {}
