import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    PresentationModule,
  ],
})
export class AppModule {}
