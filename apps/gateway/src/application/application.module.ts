import { Module } from '@nestjs/common';

import { SecurityModule } from './security/security.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [SecurityModule, UsersModule],
})
export class ApplicationModule {}
