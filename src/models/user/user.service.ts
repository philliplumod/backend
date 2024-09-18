import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';
import { hash, compare } from 'bcrypt';
import { UserDocument } from '../document/entities/document.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserDocument)
    private documentRepository: Repository<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const {
      first_name,
      last_name,
      email,
      contact_no,
      birthday,
      status,
      password,
      documents,
    } = createUserDto;

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
    });

    const savedUser = await this.userRepository.save(newUser);

    // Create and save documents
    const userDocuments = documents.map((doc) => {
      const document = this.documentRepository.create({
        ...doc,
        user: savedUser,
      });
      return document;
    });

    await this.documentRepository.save(userDocuments);

    return savedUser;
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<User | null> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await this.validatePassword(password, user.password))) {
      return user;
    }

    return null;
  }

  async updateUser(
    user_id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    // Update user properties
    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return (await this.userRepository.findOne({ where: { email } })) || null;
  }

  async validatePassword(
    password: string,
    storedPassword: string,
  ): Promise<boolean> {
    return await compare(password, storedPassword);
  }

  // delete this before deploying in the prod. P3LEP
  async logUser(user: any): Promise<void> {
    try {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error('Failed to log user: ' + error.message);
    }
  }
}
