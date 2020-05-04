import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserInterface } from './interfaces/user.interface';
import { toUserDto } from './mapper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserInterface>) {}

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userModel.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const result = await bcrypt.compareSync(password, user.password);
    if (result) {
      return toUserDto(user);
    } else {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({ username });
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password } = userDto;
    const userInDb = await this.userModel.findOne({ username });
    if (userInDb) {
      throw new HttpException('User Already Exsts', HttpStatus.BAD_REQUEST);
    }
    const hash = bcrypt.hashSync(password, 10);
    userDto.password = hash;
    const user = new this.userModel(userDto);
    user.save();
    return toUserDto(user);
  }
}
