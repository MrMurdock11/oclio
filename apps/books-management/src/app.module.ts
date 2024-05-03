import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { PresentationModule } from './presentation/presentation.module';
import { EnvKey } from './shared/enums';

@Module({
  imports: [
    PresentationModule,
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          expandVariables: true,
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get(EnvKey.ConnectionString),
        dbName: configService.get(EnvKey.Database),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
