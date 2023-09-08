import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MessagePattern } from '@nestjs/microservices';
import { MovieDto } from '@nx-workbench/movies-lib';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @HttpCode(HttpStatus.OK)
  @Get('findAll')
  getAllMoviesREST() {
    return this.moviesService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('findById/:id')
  getMovieByIdREST(@Param() params) {
    return this.moviesService.findById(params.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('findByMovieName')
  getByMovieNameREST(@Body(ValidationPipe) body: { name: string }) {
    return this.moviesService.findByMovieName(body.name);
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  createMovieREST(@Body(ValidationPipe) movie: MovieDto) {
    return this.moviesService.createMovie(movie);
  }

  @HttpCode(HttpStatus.OK)
  @Put('update')
  updateMovieREST(@Body(ValidationPipe) movie: MovieDto) {
    return this.moviesService.update(movie);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  removeMovieREST(@Param() params) {
    return this.moviesService.remove(params.id);
  }

  @MessagePattern({ cmd: 'getAllMovies' })
  getAllMovies() {
    return this.moviesService.findAll();
  }
  
  @MessagePattern({ cmd: 'getMovieById' })
  getMovieById(id: string) {
    return this.moviesService.findById(id);
  }

  @MessagePattern({ cmd: 'findMovieName' })
  getMovieName(name: string) {
    return this.moviesService.findByMovieName(name);
  }

  @MessagePattern({ cmd: 'createMovie' })
  createNewMovie(movie: MovieDto) {
    return this.moviesService.createMovie(movie);
  }

  @MessagePattern({ cmd: 'updateMovie' })
  updateMovie(movie: MovieDto) {
    return this.moviesService.update(movie);
  }

  @MessagePattern({ cmd: 'deleteMovie' })
  removeMovie(id: string) {
    return this.moviesService.remove(id);
  }
}
