import { Controller, Post, Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto, LoginUserDto } from '../user.dto';
import { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userService.createUser(createUserDto);
      return user;
    } catch (error) {
      throw new HttpException('User could not be created', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ message: string, user: User }> {
    const user = await this.userService.validateUser(loginUserDto);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return {
      message: 'Login successful',
      user,
    };
  }

  @Get('users')
  async getUsers(): Promise<any> {
    try {
      const users = await this.userService.getUsers();
      return users.length > 0 ? users : { message: 'No users found' };
    } catch (error) {
      throw new HttpException('Failed to get users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}