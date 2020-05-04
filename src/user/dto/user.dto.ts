import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty() username: string;
  @IsNotEmpty() @IsEmail() email: string;
}
