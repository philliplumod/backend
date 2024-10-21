import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthDTO } from '../dto/auth.dto';
import { User } from 'src/models/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';

@Injectable()
export class AuthServiceLogin {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(authPayLoad: AuthDTO): Promise<User> {
    const { email, password } = authPayLoad;
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['user_id', 'email', 'password', 'role', 'status'],
    });

    if (!user) throw new NotFoundException('User not found');
    if (!user.status)
      throw new ForbiddenException('User is archived and cannot log in');
    if (!(await this.validatePassword(password, user.password)))
      throw new NotFoundException('Incorrect password');

    return user;
  }

  async validatePassword(
    password: string,
    storedPassword: string,
  ): Promise<boolean> {
    return compare(password, storedPassword);
  }
}
