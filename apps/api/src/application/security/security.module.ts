import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';

@Module({
  exports: [SecurityService],
  providers: [SecurityService],
})
export class SecurityModule {}
