import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Movie } from '../schemas/movies.schema';

// Mocks
const mockMovieModel = {
  create: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('MoviesService', () => {
  let moviesService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movie.name),
          useValue: mockMovieModel,
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMovie', () => {
    it('should create a movie', async () => {
      const movieDto = {
        title: 'Test Movie',
        // Add other movie properties here
      };

      mockMovieModel.create.mockResolvedValue(movieDto);

      const result = await moviesService.createMovie(movieDto);

      expect(result).toEqual(movieDto);
      expect(mockMovieModel.create).toHaveBeenCalledWith(movieDto);
    });

    it('should handle errors during movie creation', async () => {
      const movieDto = {
        title: 'Test Movie',
        // Add other movie properties here
      };

      const error = new Error('Test error');
      mockMovieModel.create.mockRejectedValue(error);

      try {
        await moviesService.createMovie(movieDto);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.response).toEqual({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'A error occurred in saving the movie on MongoDB',
        });
        expect(e.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(e.getCause()).toBe(error);
      }
    });
  });

  describe('findByMovieName', () => {
    it('should find a movie by name', async () => {
      const movieName = 'Test Movie';
      const movieDto = {
        title: movieName,
        // Add other movie properties here
      };

      mockMovieModel.findOne.mockResolvedValue(movieDto);

      const result = await moviesService.findByMovieName(movieName);

      expect(result).toEqual(movieDto);
      expect(mockMovieModel.findOne).toHaveBeenCalledWith({ name: movieName });
    });

    it('should throw NotFoundException for a movie not found by name', async () => {
      const movieName = 'Non-Existent Movie';
      mockMovieModel.findOne.mockResolvedValue(null);

      try {
        await moviesService.findByMovieName(movieName);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie #${movieName} not found`);
      }
    });
  });

  // Add tests for other methods in a similar manner

});
