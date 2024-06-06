import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../persistence/persistence.module';
import { CreateChapterHandler } from './commands/create-chapter/create-chapter.handle';
import { DeleteChapterHandler } from './commands/delete-chapter/delete-chapter.handle';
import { RearrangeChapterHandler } from './commands/rearrange-chapter/rearrange-chapter.handle';
import { UpdateChapterHandler } from './commands/update-chapter/update-chapter.handle';

const CommandHandlers = [
  CreateChapterHandler,
  UpdateChapterHandler,
  DeleteChapterHandler,
  RearrangeChapterHandler,
];

@Module({
  imports: [PersistenceModule],
  providers: [...CommandHandlers],
})
export class ChaptersModule {}
