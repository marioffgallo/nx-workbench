import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
  Get,
  Param,
  ValidationPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('DATABASE-MS') private readonly databaseService: ClientProxy
  ) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('getAllUsers')
  async getAllUsers() {
    return this.databaseService.send({ cmd: 'getAllUsers' }, {});
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('findById/:id')
  getById(@Param() params) {
    return this.databaseService.send({ cmd: 'getUserById' }, params.id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('findByUsername')
  getByUsername(@Body(ValidationPipe) body: { username: string }) {
    return this.databaseService.send({ cmd: 'findByUsername' }, body.username);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('create')
  createUser(@Body(ValidationPipe) user: UserDto) {
    return this.databaseService.send({ cmd: 'createUser' }, user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Put('updateUser')
  updateUser(@Body(ValidationPipe) user: UserDto) {
    return this.databaseService.send({ cmd: 'updateUser' }, user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  deleteUser(@Param() params) {
    return this.databaseService.send({ cmd: 'deleteUser' }, params.id);
  }
}
