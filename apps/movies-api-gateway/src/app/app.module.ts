import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard, MoviesLibModule } from '@nx-workbench/movies-lib';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [AuthModule, UsersModule, MoviesLibModule, MoviesModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
