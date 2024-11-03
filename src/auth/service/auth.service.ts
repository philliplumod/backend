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
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServiceLogin {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(authPayLoad: AuthDTO): Promise<{ user: User; token: string }> {
    const { email, password } = authPayLoad;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) throw new NotFoundException('User not found');
    if (user.status == false) 
      throw new ForbiddenException('User is archived and cannot log in');
    if (user.isBlocked)
      throw new ForbiddenException('User is blocked and cannot log in');
    if (!(await this.validatePassword(password, user.password)))
      throw new NotFoundException('Incorrect password');

    const token = this.jwtService.sign({
      userId: user.user_id,
      email: user.email,
    });
    console.log('Token generated:', token);
    return { user, token };
  }

  async validatePassword(
    password: string,
    storedPassword: string,
  ): Promise<boolean> {
    return compare(password, storedPassword);
  }
}
