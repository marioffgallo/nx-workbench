import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(
    username: string,
    password: string,
    email: string
  ): Promise<User | null> {
    try {
      const newUser = await new this.userModel({
        username,
        password,
        email,
      }).save();
      return newUser.save();
    } catch (error) {
      console.error('Error on createUser: ', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'A error occured in saving the user on MongoDB',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        }
      );
    }
  }

  async findByUserName(username: string): Promise<UserDto | null> {
    const userFound = await this.userModel
      .findOne({ username: username })
      .exec();

    if (!userFound) {
      throw new NotFoundException(`User #${username} not found`);
    }

    return userFound;
  }

  async findById(id: string): Promise<UserDto | null> {
    const userFound = await this.userModel.findById(id).exec();

    if (!userFound) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return userFound;
  }

  async findAll(): Promise<UserDto[] | null> {
    const userData = await this.userModel.find();

    if (!userData || userData.length == 0) {
      throw new NotFoundException('Users data not found!');
    }

    return userData;
  }

  async update(user: UserDto) {
    const existingUser = await this.userModel.findByIdAndUpdate(user.id, user, {
      new: true,
    });

    if (!existingUser) {
      throw new NotFoundException(`User #${user.id} not found for update`);
    }

    return existingUser;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new NotFoundException(`User #${id} not found for remove`);
    }

    return deletedUser;
  }
}
