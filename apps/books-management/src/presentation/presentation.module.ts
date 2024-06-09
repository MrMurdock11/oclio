import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ApplicationModule } from '../application/application.module';
import { BooksController } from './books.controller';
import { ChaptersController } from './chapters.controller';
import { MetadataController } from './metadata.controller';

@Module({
  imports: [ApplicationModule, CqrsModule],
  controllers: [BooksController, ChaptersController, MetadataController],
})
export class PresentationModule {}
