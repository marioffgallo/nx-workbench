import { Injectable } from '@nestjs/common';
import { UserService } from '../models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CredentialsDto } from './dto/credentials.dto';
import { UserDto } from '../models/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(credentials: CredentialsDto): Promise<UserDto | null> {
    const user = await this.userService.findByUserName(credentials.username);

    if (user && bcrypt.compareSync(credentials.password, user.password)) {
      return user;
    }

    return null;
  }

  async register(credentials: CredentialsDto) {
    const hashedPassword = bcrypt.hashSync(credentials.password, 10);

    const user = await this.userService.createUser(credentials.username, hashedPassword, credentials.email);

    return user;
  }

  async login(credentials: CredentialsDto): Promise<{ access_token: string }> {
    const payload = { username: credentials.username, sub: credentials.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
