import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    // PrismaModule,
    // UsersModule,
    // ApplicationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ApiModule,
    // PersistenceModule,
    // CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
