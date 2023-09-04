import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MoviesLibModule } from '@nx-workbench/movies-lib';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MoviesLibModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
