import { Module } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { MongoDatabaseProviderModule } from './providers/database/mongo/mongo-provider.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule,MongoDatabaseProviderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
