import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { EnvKey, Microservice } from '@oclio/common/enums';

import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: Microservice.BooksManagement,
          inject: [ConfigService],
          useFactory: (configService) => ({
            transport: Transport.TCP,
            options: { port: configService.get(EnvKey.BooksManagementPort) },
          }),
        },
      ],
      isGlobal: true,
    }),
    PresentationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
