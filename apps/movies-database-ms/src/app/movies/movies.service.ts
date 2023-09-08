import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Movie } from '../schemas/movies.schema';
import { MovieDto } from '@nx-workbench/movies-lib';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async createMovie(movie: MovieDto): Promise<Movie | null> {
    try {
      const newMovie = await new this.movieModel(movie).save();
      return newMovie.save();
    } catch (error) {
      console.error('Error on createMovie: ', error);

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'A error occured in saving the movie on MongoDB',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        }
      );
    }
  }

  async findByMovieName(name: string): Promise<MovieDto | null> {
    const movieFound = await this.movieModel.findOne({ name: name }).exec();

    if (!movieFound) {
      throw new NotFoundException(`Movie #${name} not found`);
    }

    return movieFound;
  }

  async findById(id: string): Promise<MovieDto | null> {
    const movieFound = await this.movieModel.findById(id).exec();

    if (!movieFound) {
      throw new NotFoundException(`Movie #${id} not found`);
    }

    return movieFound;
  }

  async findAll(): Promise<MovieDto[] | null> {
    const moviesData = await this.movieModel.find();

    if (!moviesData || moviesData.length == 0) {
      throw new NotFoundException('Movies data not found!');
    }

    return moviesData;
  }

  async update(movie: MovieDto) {
    const existingMovie = await this.movieModel.findByIdAndUpdate(
      movie.id,
      movie,
      {
        new: true,
      }
    );

    if (!existingMovie) {
      throw new NotFoundException(`Movie #${movie.id} not found for update`);
    }

    return existingMovie;
  }

  async remove(id: string) {
    const deletedMovie = await this.movieModel.findByIdAndDelete(id);

    if (!deletedMovie) {
      throw new NotFoundException(`Movie #${id} not found for remove`);
    }

    return deletedMovie;
  }
}
