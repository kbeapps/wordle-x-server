import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, MongooseError } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { SignupAuthDto } from 'src/auth/dto/signup-auth.dto';

@Injectable({})
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async create(authDto: SignupAuthDto): Promise<User> {
    const user: User = new this.userModel(authDto);

    try {
      delete user.password;
      return await this.userModel.create(user);
    } catch (error) {
      if (error instanceof MongooseError) {
      }
      throw new Error(String(error));
    }
  }

  public findAll() {
    return `This action returns all users`;
  }

  public async findOne(id: string): Promise<User> {
    try {
      return await this.userModel.findOne({ _id: id });
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.userModel.findByIdAndUpdate(updateUserDto, {
        new: true,
      });
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async remove(id: string) {
    try {
      return await this.userModel.findByIdAndRemove({ _id: id });
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
