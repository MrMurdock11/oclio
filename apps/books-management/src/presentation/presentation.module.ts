import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ApplicationModule } from '../application/application.module';
import { BooksController } from './books.controller';

@Module({
  imports: [ApplicationModule, CqrsModule],
  controllers: [BooksController],
})
export class PresentationModule {}
