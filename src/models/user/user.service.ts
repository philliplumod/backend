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
import { CreateUserDto } from './dto/user.signup.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      
      // Check if the email already exists in the database
      const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await hash(createUserDto.password, 10); 
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword, // Store the hashed password
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

  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.status === false) {
      throw new ForbiddenException('User is archived and cannot log in');
    }

    const isValidPassword = await this.validatePassword(
      password,
      user.password,
    );
    if (!isValidPassword) {
      throw new NotFoundException('Incorrect password');
    }

    return user;
  }

  async updateUser(
    user_id: string,
    updateUserDto: CreateUserDto,
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

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find({ where: { status: false } });
    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async validatePassword(
    password: string,
    storedPassword: string,
  ): Promise<boolean> {
    return await compare(password, storedPassword);
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
}
