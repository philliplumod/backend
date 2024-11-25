import {
  BadRequestException,
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
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export type SendEmailDTO = {
  sender?: string | Address;
  recipient: Address[];
  subject: string;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
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
        status: false,
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

  async verifyUser(user_id: string, dto: SendEmailDTO): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.status = true;
    await this.userRepository.save(user);

    const { sender, subject, recipient = [] } = dto;
    const finalRecipient =
      recipient.length > 0
        ? recipient
        : [{ name: user.first_name, address: user.email }];

    await this.mailerService.sendMail({
      from: sender || this.configService.get<string>('MAIL_FROM'),
      to: finalRecipient,
      subject: subject || 'Account Verified',
      text: `Hello ${user.first_name}, your account has been verified.`,
    });

    return user;
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

  async updateUserRole(
    user_id: string,
    role: 'admin' | 'renter',
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!['admin', 'renter'].includes(role)) {
      throw new BadRequestException('Invalid role');
    }

    user.role = role;
    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  }
}
