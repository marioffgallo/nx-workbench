import { Module } from '@nestjs/common';

import { MongoDatabaseProviderModule } from './providers/database/mongo/mongo-provider.module';
import { UserModule } from './models/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MongoDatabaseProviderModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
