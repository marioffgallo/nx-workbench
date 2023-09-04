import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '@nx-workbench/movies-lib';

@Injectable()
export class UserService {
  constructor(
    @Inject('DATABASE-MS') private readonly databaseService: ClientProxy
  ) {}

  async getAllUsers() {
    try {
      return this.databaseService.send({ cmd: 'getAllUsers' }, {});
    } catch (error) {
      return error;
    }
  }

  async getById(id: string) {
    try {
      return this.databaseService.send({ cmd: 'getUserById' }, id);
    } catch (error) {
      return error;
    }
  }

  async getByUsername(username: string) {
    try {
      return this.databaseService.send({ cmd: 'findByUsername' }, username);
    } catch (error) {
      return error;
    }
  }

  async createUser(user: UserDto) {
    try {
      return this.databaseService.send({ cmd: 'createUser' }, user);
    } catch (error) {
      return error;
    }
  }

  async updateUser(user: UserDto) {
    try {
      return this.databaseService.send({ cmd: 'updateUser' }, user);
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id: string) {
    try {
      return this.databaseService.send({ cmd: 'deleteUser' }, id);
    } catch (error) {
      return error;
    }
  }
}
