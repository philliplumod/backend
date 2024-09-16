import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Param,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto, LoginUserDto } from '../user.dto';
import { User } from '../entities/user.entity';
import { Request } from 'express';

@Controller('user')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userService.createUser(createUserDto);
      return user;
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL unique constraint violation
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ message: string; user: User }> {
    try {
      const user = await this.userService.findByEmail(loginUserDto.email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const isPasswordValid = await this.userService.validatePassword(
        loginUserDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
      }

      return { message: 'Login successful', user };
    } catch (error) {
      throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('users')
  async getUsers(@Req() request: Request): Promise<any> {
    try {
      const users = await this.userService.getUsers();
      if (users.length === 0) {
        return { message: 'No users found' };
      }
      return users;
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //for developer testing
  @Post('log-multiple-users')
  async logMultipleUsers(@Body() users: any[]): Promise<any> {
    try {
      for (const user of users) {
        // Assuming userService has a method to log a user
        await this.userService.logUser(user);
      }
      return { message: 'Multiple users logged successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to log multiple users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: any,
  ): Promise<any> {
    try {
      const updatedUser = await this.userService.updateUser(id, updateUserDto);
      return updatedUser;
    } catch (error) {
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
