import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.create.dto';
import { compare, hash } from 'bcrypt';
import { UpdateUserDto } from './dto/user.update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await hash(createUserDto.password, 10);
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
        isBlocked: false,
      });
      console.log('New user entity created:', newUser);

      const savedUser = await this.userRepository.save(newUser);
      console.log('User saved to database:', savedUser);

      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async getUserById(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      ...user,
      password: user.password,
    };
  }

  async updateUser(
    user_id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);

    if (updateUserDto.password) {
      user.password = await hash(updateUserDto.password, 10); // Update hashed password
    }

    try {
      const updatedUser = await this.userRepository.save(user);
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async getAllUser(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async getActiveUser(): Promise<User[]> {
    const users = await this.userRepository.find({ where: { status: true } });
    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async getInActiveUser(): Promise<User[]> {
    const users = await this.userRepository.find({ where: { status: false } });
    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async archiveUser(user_id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.status = true;
    await this.userRepository.save(user);
  }

  async restoreUser(user_id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.status = false;
    await this.userRepository.save(user);
  }

  async changePassword(
    user_id: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Current password is incorrect');
    }

    user.password = await hash(newPassword, 10);
    await this.userRepository.save(user);
  }
}
