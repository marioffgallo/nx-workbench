import {
  Body,
  Request,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { CredentialsDto, JwtAuthGuard, LocalAuthGuard } from '@nx-workbench/movies-lib';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body(ValidationPipe) credentials: CredentialsDto) {
    return this.authService.login(credentials);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body(ValidationPipe) credentials: CredentialsDto) {
    return this.authService.register(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('username')
  async getUsername(@Body() credentials: CredentialsDto) {
    return this.authService.validateUser(credentials);
  }

  @MessagePattern({ cmd: 'loginUser' })
  loginUser(credentials: CredentialsDto) {
    return this.authService.login(credentials);
  }

  @MessagePattern({ cmd: 'registerUser' })
  registerNewUser(credentials: CredentialsDto) {
    return this.authService.register(credentials);
  }
}
