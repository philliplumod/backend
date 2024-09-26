import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash, compare } from 'bcrypt';
import { UserDocument } from './entities/user.document.entity';
import { LoginUserDto } from './dto/user.login.dto';
import { CreateUserDto } from './dto/user.signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserDocument)
    private documentRepository: Repository<UserDocument>,
  ) {}


  //FIXED: one document object for each user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log('Received createUserDto:', createUserDto); 
    try {
      const {
        first_name,
        last_name,
        email,
        contact_no,
        birthday,
        status,
        password,
        address,
        gender,
        document, // Now a single document object
      } = createUserDto;
      console.log('Document:', document);
      // Hash password before saving
      const hashedPassword = await hash(password, 10);

      // Create new user
      const newUser = this.userRepository.create({
        first_name,
        last_name,
        email,
        contact_no: Number(contact_no),
        birthday,
        status,
        password: hashedPassword,
        address,
        gender,
      });

      const savedUser = await this.userRepository.save(newUser);

      if (document) {
        const userDocument = this.documentRepository.create({
          ...document,
          user: savedUser,
        });
        await this.documentRepository.save(userDocument);
      }

      return savedUser;
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL unique constraint violation
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<User | null> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await this.validatePassword(password, user.password);
    if (!isValidPassword) {
      throw new NotFoundException('Incorrect password');
    }

    return user;
  }

  async updateUser(user_id: string, updateUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id }, relations: ['document'] });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update user properties
    Object.assign(user, updateUserDto);

    // Handle the single document update
    if (updateUserDto.document) {
      // Delete existing document if it exists
      await this.documentRepository.delete({ user: { user_id } });

      const updatedDocument = this.documentRepository.create({
        ...updateUserDto.document,
        user,
      });

      await this.documentRepository.save(updatedDocument);
    }

    try {
      const updatedUser = await this.userRepository.save(user);
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find({
      where: { isArchived: false },
      relations: ['document'],
    });
    if (users.length === 0) {
      throw new NotFoundException('No users found');     
    }
    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } }) || null;
  }

  async validatePassword(password: string, storedPassword: string): Promise<boolean> {
    return await compare(password, storedPassword);
  }

  async archiveUser(user_id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isArchived = true;
    await this.userRepository.save(user);
  }

  async restoreUser(user_id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isArchived = false;
    await this.userRepository.save(user);
  }
}
