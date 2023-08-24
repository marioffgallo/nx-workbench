import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {
  }

  @Get('findById/:id')
  get(@Param() params) {
    return this.service.findById(params.id);
  }

  @Post('create')
  create(@Body() user: UserDto) {
    return this.service.createUser(user.username, user.password, user.email);
  }

  @Put('update')
  update(@Body() user: UserDto) {
    return this.service.update(user);
  }

  @Delete('delete/:id')
  remove(@Param() params) {
    return this.service.remove(params.id);
  }
}