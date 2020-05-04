import { UserInterface } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';

export const toUserDto = (data: UserInterface): UserDto => {
  const { username, email } = data;
  const userDto: UserDto = { username, email };
  return userDto;
};
