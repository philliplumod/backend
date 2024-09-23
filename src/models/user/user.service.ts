import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash, compare } from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { UserDocument } from './entities/user.document.entity';

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
      address,
      gender,
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
      address,
      gender,
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
    updateUserDto: CreateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id },
      relations: ['documents'],
    });

    // Update user properties
    Object.assign(user, updateUserDto);

    // Update documents if provided
    if (updateUserDto.documents && updateUserDto.documents.length > 0) {
      // Remove old documents (optional: if you want to remove them before saving new ones)
      await this.documentRepository.delete({ user: { user_id } });

      const updatedDocuments = updateUserDto.documents.map((doc) => {
        const document = this.documentRepository.create({
          ...doc,
          user, // Ensure the documents are linked to the user
        });
        return document;
      });

      user.documents = await this.documentRepository.save(updatedDocuments);
    }

    try {
      // Save the updated userw
      const updatedUser = await this.userRepository.save(user);
      return updatedUser;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({
      where: { isArchived: false },
      relations: ['documents'],
    });
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

  async archiveUser(user_id: string): Promise<void> {
    await this.userRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const user = await transactionalEntityManager.findOne(User, {
          where: { user_id },
        });

        if (!user) {
          throw new Error('User not found');
        }

        user.isArchived = true;
        await transactionalEntityManager.save(user);
      },
    );
  }

  async restoreUser(id: string): Promise<void> {
    await this.userRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const user = await transactionalEntityManager.findOne(User, {
          where: { user_id: id },
        });

        if (!user) {
          throw new Error('User not found');
        }

        user.isArchived = false;
        await transactionalEntityManager.save(user);
      },
    );
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
