import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CredentialsDto } from '@nx-workbench/movies-lib';

@Injectable()
export class AuthService {
  constructor(
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
