import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Param,
  Delete,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';

@Controller('user')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ message: string; user: User }> {
    const user = await this.userService.validateUser(loginUserDto);
    return { message: 'Login successful', user };
  }

  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id/archive')
  async archiveUser(@Param('id') id: string): Promise<{ message: string }> {
    await this.userService.archiveUser(id);
    return { message: 'User archived successfully' };
  }

  @Patch(':id/restore')
  async restoreUser(@Param('id') id: string): Promise<{ message: string }> {
    await this.userService.restoreUser(id);
    return { message: 'User restored successfully' };
  }


}
