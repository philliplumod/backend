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
import { CreateUserDto } from '../dto/user.signup.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    const user = await this.userService.createUser(createUserDto);
    return { message: 'User created successfully', user };
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ message: string; user: User }> {
    const user = await this.userService.login(email, password);
    return { message: 'Login successfully', user };
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    const user = await this.userService.updateUser(id, updateUserDto);
    return { message: 'User updated successfully', user };
  }

  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Delete('archive/:id')
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
