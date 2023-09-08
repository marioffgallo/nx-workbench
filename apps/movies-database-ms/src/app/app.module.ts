import { Module } from '@nestjs/common';
import { MongoDatabaseProviderModule } from './providers/database/mongo/mongo-provider.module';
import { ConfigModule } from '@nestjs/config';
import { MoviesLibModule } from '@nx-workbench/movies-lib';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongoDatabaseProviderModule,
    MoviesLibModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
