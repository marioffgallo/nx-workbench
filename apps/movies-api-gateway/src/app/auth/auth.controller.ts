import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
}
