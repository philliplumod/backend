import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  // POST FOR REGISTER A USER
  @Post('register')
  registerUser(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
  ): any {
    const newUser = this.userService.createUser(firstName, lastName, email);
    return { message: 'User registered successfully!', user: newUser };
  }
  // FETCH ALL THE USER REGISTERED
  @Get()
  getUsers(): any {
    const users = this.userService.getUsers();
    return users.length > 0 ? users : { message: 'No users found' };
  }

}
