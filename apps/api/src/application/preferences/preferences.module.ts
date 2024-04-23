import { Module } from '@nestjs/common';

import { ServicesModule } from '$application/services/services.module';

import { UpdatePreferencesHandler } from './commands/update-preferences/update-preferences.handler';
import { GetPreferencesHandler } from './queries/get-preferences/get-preferences.handler';

@Module({
  imports: [ServicesModule],
  providers: [GetPreferencesHandler, UpdatePreferencesHandler],
})
export class PreferencesModule {}
