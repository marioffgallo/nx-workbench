import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CredentialsDto, UserDto } from '@nx-workbench/movies-lib';

@Injectable()
export class AuthService {
  constructor(
    @Inject('DATABASE-MS') private readonly databaseService: ClientProxy,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(credentials: CredentialsDto): Promise<UserDto | null> {
    try {
      const user: UserDto = await lastValueFrom(
        this.databaseService.send({ cmd: 'findUsername' }, credentials.username)
      );

      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        return user;
      }

      return null;
    } catch (error) {
      console.error('Error during user validation: ', error);
      return null;
    }
  }

  async register(credentials: CredentialsDto) {
    try {
      const hashedPassword = bcrypt.hashSync(credentials.password, 10);
      const userObj: UserDto = {
        username: credentials.username,
        password: hashedPassword,
        email: credentials.email
      }

      const user: UserDto = await lastValueFrom(
        this.databaseService.send({ cmd: 'createUser' }, userObj)
      );

      return user;
    } catch (error) {
      console.error('Error during user creation: ', error);
      return error;
    }
  }

  async login(credentials: CredentialsDto): Promise<{ access_token: string }> {
    const payload = {
      username: credentials.username,
      sub: credentials.password,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
