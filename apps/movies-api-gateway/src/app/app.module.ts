import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './models/users/users.module';
import { MoviesModule } from './models/movies/movies.module';

@Module({
  imports: [AuthModule, UsersModule, MoviesModule],
  providers: [],
})
export class AppModule {}
