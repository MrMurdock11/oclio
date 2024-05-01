import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../persistence/persistence.module';
import { CreateBookHandler } from './commands/create-book/create-book.handler';

@Module({
  imports: [PersistenceModule],
  providers: [CreateBookHandler],
})
export class BooksModule {}
