import { Module } from '@nestjs/common';

import { CoreModule } from 'src/core/core.module';

import { SecurityModule } from './security/security.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [SecurityModule, UsersModule, CoreModule],
})
export class ApplicationModule {}
