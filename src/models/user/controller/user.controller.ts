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
import { CreateUserDto } from '../dto/user.create.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/user.update.dto';

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

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; user: User }> {
    const user = await this.userService.updateUser(id, updateUserDto);
    return { message: 'User updated successfully', user };
  }

  @Get('users/active')
  async getActiveUser(): Promise<User[]> {
    return this.userService.getActiveUser();
  }

  @Get('users/all')
  async getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
  ): Promise<{ message: string; user: User }> {
    const user = await this.userService.getUserById(id);
    return { message: 'User found', user };
  }

  @Get('users/inactive')
  async getInActiveUser(): Promise<User[]> {
    return this.userService.getInActiveUser();
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
