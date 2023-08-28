import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {
  }

  @HttpCode(HttpStatus.OK)
  @Get('findAll')
  getAllUsers() {
    return this.service.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('findById/:id')
  getById(@Param() params) {
    return this.service.findById(params.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('findByUsername')
  getByUsername(@Body(ValidationPipe) body: { username: string }) {
    return this.service.findByUserName(body.username);
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  createUser(@Body(ValidationPipe) user: UserDto) {
    return this.service.createUser(user.username, user.password, user.email);
  }

  @HttpCode(HttpStatus.OK)
  @Put('update')
  updateUser(@Body(ValidationPipe) user: UserDto) {
    return this.service.update(user);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  removeUser(@Param() params) {
    return this.service.remove(params.id);
  }
}