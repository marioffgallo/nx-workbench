import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieDto } from '@nx-workbench/movies-lib';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @HttpCode(HttpStatus.OK)
  @Get('getAllMovies')
  async getAllMovies() {
    return this.moviesService.getAllMovies();
  }

  @HttpCode(HttpStatus.OK)
  @Get('findById/:id')
  async getById(@Param() params) {
    return this.moviesService.getById(params.id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  async createMovie(@Body(ValidationPipe) movie: MovieDto) {
    return this.moviesService.createMovie(movie);
  }

  @HttpCode(HttpStatus.OK)
  @Put('update')
  async updateMovie(@Body(ValidationPipe) movie: MovieDto) {
    return this.moviesService.updateMovie(movie);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  async deleteMovie(@Param() params) {
    return this.moviesService.deleteMovie(params.id);
  }
}
