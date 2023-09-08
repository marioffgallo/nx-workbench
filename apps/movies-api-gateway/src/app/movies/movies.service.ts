import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MovieDto } from '@nx-workbench/movies-lib';

@Injectable()
export class MoviesService {
  constructor(@Inject('DATABASE-MS') private readonly databaseService: ClientProxy){}

  async getAllMovies() {
    try {
      return this.databaseService.send({ cmd: 'getAllMovies' }, {});
    } catch (error) {
      return error;
    }
  }

  async getById(id: string) {
    try {
      return this.databaseService.send({ cmd: 'getMovieById' }, id);
    } catch (error) {
      return error;
    }
  }

  async getByMovieName(name: string) {
    try {
      return this.databaseService.send({ cmd: 'findByMovieName' }, name);
    } catch (error) {
      return error;
    }
  }

  async createMovie(movie: MovieDto) {
    try {
      return this.databaseService.send({ cmd: 'createMovie' }, movie);
    } catch (error) {
      return error;
    }
  }

  async updateMovie(movie: MovieDto) {
    try {
      return this.databaseService.send({ cmd: 'updateMovie' }, movie);
    } catch (error) {
      return error;
    }
  }

  async deleteMovie(id: string) {
    try {
      return this.databaseService.send({ cmd: 'deleteMovie' }, id);
    } catch (error) {
      return error;
    }
  }
}
