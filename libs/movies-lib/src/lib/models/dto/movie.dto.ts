import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MovieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsArray()
  @IsNotEmpty()
  cast: string[];

  id?: string;
}
