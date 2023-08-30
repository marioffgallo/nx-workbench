import { Inject, Injectable } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject('DATABASE-MS') private readonly databaseService: ClientProxy,
    @Inject('AUTHENTICATION-MS')
    private readonly authenticationService: ClientProxy
  ) {}

  async login(credentials: CredentialsDto) {
    try {
      return this.authenticationService.send(
        { cmd: 'loginUser' },
        credentials
      );
    } catch (error) {
      return error;
    }
  }

  async register(credentials: CredentialsDto) {
    try {
        return this.authenticationService.send(
          { cmd: 'registerUser' },
          credentials
        );
      } catch (error) {
        return error;
      }
  }
}
