import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { EnvKey, Microservice } from '@oclio/common/enums';

import { BooksManagementService } from './books-management.service';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: Microservice.BooksManagement,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get(EnvKey.BooksManagementHost),
            port: configService.get(EnvKey.BooksManagementPort),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [BooksManagementService],
  exports: [BooksManagementService],
})
export class BooksManagementModule {}
