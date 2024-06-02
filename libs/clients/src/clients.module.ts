import { Module } from '@nestjs/common';

import { BooksManagementModule } from './books-management/books-management.module';

@Module({
  imports: [BooksManagementModule],
  exports: [BooksManagementModule],
})
export class ClientsModule {}
