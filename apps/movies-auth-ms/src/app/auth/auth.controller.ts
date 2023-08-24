import { Body, Request, Controller, Post, UseGuards, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';

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
}
