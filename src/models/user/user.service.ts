import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // Inject the repository for the User entity
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, email } = createUserDto;
    const newUser = this.userRepository.create({ firstName, lastName, email });
    return await this.userRepository.save(newUser);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find(); // Get all users
  }
}
