import { Module } from '@nestjs/common';

import { MongoDatabaseProviderModule } from './providers/database/mongo/mongo-provider.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MongoDatabaseProviderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
