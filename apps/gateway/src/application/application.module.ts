import { Module } from '@nestjs/common';

import { SecurityModule } from './security/security.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [SecurityModule, ServicesModule],
  exports: [ServicesModule],
})
export class ApplicationModule {}
