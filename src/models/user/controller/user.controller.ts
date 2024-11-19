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
import { SendEmailDTO, UserService } from '../user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user.create.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/user.update.dto';
import { UpdatePasswordDto } from '../dto/user.change.pass.dto';
import { UpdateUserRoleDto } from '../dto/user.update.role.dto';

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

  @Put('update/:id')
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
  @Put('change-password/:id')
  async changePassword(
    @Param('id') id: string,
    @Body() UpdatePasswordDto: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    await this.userService.changePassword(
      id,
      UpdatePasswordDto.currentPassword,
      UpdatePasswordDto.newPassword,
    );
    return { message: 'Password changed successfully' };
  }

  @Put(':id/user-role')
  async updateUserRole(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<{ message: string }> {
    await this.userService.updateUserRole(id, updateUserRoleDto.role);
    return { message: 'User role updated successfully' };
  }
  @Put(':id/verify')  
  async verifyUser(
    @Param('id') user_id: string,
    @Body() dto: SendEmailDTO,
  ): Promise<User> {
    return this.userService.verifyUser(user_id, dto);
  }
}
