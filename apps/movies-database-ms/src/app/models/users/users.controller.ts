import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { UserDto } from './dto/user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {
  }

  @HttpCode(HttpStatus.OK)
  @Get('findAll')
  getAllUsersREST() {
    return this.service.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('findById/:id')
  getByIdREST(@Param() params) {
    return this.service.findById(params.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('findByUsername')
  getByUsernameREST(@Body(ValidationPipe) body: { username: string }) {
    return this.service.findByUserName(body.username);
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  createUserREST(@Body(ValidationPipe) user: UserDto) {
    return this.service.createUser(user.username, user.password, user.email);
  }

  @HttpCode(HttpStatus.OK)
  @Put('update')
  updateUserREST(@Body(ValidationPipe) user: UserDto) {
    return this.service.update(user);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  removeUserREST(@Param() params) {
    return this.service.remove(params.id);
  }

  @MessagePattern({ cmd: 'getAllUsers' })
  getAllUsers() {
    return this.service.findAll();
  }
  
  @MessagePattern({ cmd: 'getUserById' })
  getById(id: string) {
    return this.service.findById(id);
  }

  @MessagePattern({ cmd: 'findUsername' })
  getUsername(username: string) {
    return this.service.findByUserName(username);
  }

  @MessagePattern({ cmd: 'createUser' })
  createNewUser(user: UserDto) {
    return this.service.createUser(user.username, user.password, user.email);
  }

  @MessagePattern({ cmd: 'updateUser' })
  updateUser(user: UserDto) {
    return this.service.update(user);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  removeUser(id: string) {
    return this.service.remove(id);
  }
}