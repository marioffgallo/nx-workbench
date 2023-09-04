import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Param,
  ValidationPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { UserDto } from '@nx-workbench/movies-lib';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('getAllUsers')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @HttpCode(HttpStatus.OK)
  @Get('findById/:id')
  getById(@Param() params) {
    return this.userService.getById(params.id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('findByUsername')
  getByUsername(@Body(ValidationPipe) body: { username: string }) {
    return this.userService.getByUsername(body.username);
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  createUser(@Body(ValidationPipe) user: UserDto) {
    return this.userService.createUser(user);
  }

  @HttpCode(HttpStatus.OK)
  @Put('updateUser')
  updateUser(@Body(ValidationPipe) user: UserDto) {
    return this.userService.updateUser(user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete/:id')
  deleteUser(@Param() params) {
    return this.userService.deleteUser(params.id);
  }
}
