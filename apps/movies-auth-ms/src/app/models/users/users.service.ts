import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(username: string, password: string, email: string): Promise<User | null> {
    const newUser = await new this.userModel({username, password, email }).save();
    return newUser.save();
  }

  async findByUserName(username: string): Promise<UserDto | null> {
    try {
      const userFound: UserDocument | null = await this.userModel.findOne({ username: username }).exec();

      console.log('Find by username: ', userFound);

      if(!userFound) {
        return null;
      }

      const userDto: UserDto = {
        username: userFound.username,
        password: userFound.password,
        email: userFound.email,
        id: userFound.id
      }

      return userDto;
    } catch (err) {
      console.log("error on find by username: ",err);
      return null;
    }
  }

  async findById(id: string): Promise<UserDto | null> {
    try {
      const userFound: UserDocument | null = await this.userModel.findOne({ id: new Types.ObjectId(id) }).exec();

      console.log('Find by id: ', userFound);
      
      const userDto: UserDto = {
        username: userFound.username,
        password: userFound.password,
        email: userFound.email,
        id: userFound.id
      }

      return userDto;
    } catch (err) {
      console.log("error on find by id: ",err);
      return null;
    }
  }

  async update(user: UserDto) {
    // ...
  }

  async remove(user: UserDto) {
    // ...
  }
}
