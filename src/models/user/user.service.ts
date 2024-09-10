import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, email, contactNo, birthday, status, password } = createUserDto;

    // Create new user and hash the password
    const newUser = this.userRepository.create({ 
      firstName, 
      lastName, 
      email, 
      contactNo: Number(contactNo), 
      birthday, 
      status, 
      password 
    });

    await newUser.hashPassword();  // Hash password before saving

    return await this.userRepository.save(newUser);
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<User | null> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    // Validate password
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
