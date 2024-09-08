import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  // POST FOR REGISTER A USER
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  // FETCH ALL THE REGISTERED USER 
  @Get()
  async getUsers(): Promise<any> {
    const users = this.userService.getUsers();
    return (await users).length > 0 ? users : { message: 'No users found' };
  }

}
