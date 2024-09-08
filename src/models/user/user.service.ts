import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid'; // For generating unique user ids

@Injectable()
export class UserService {
  private users: User[] = [];

  createUser(firstName: string, lastName: string, email: string): User {
    const newUser = new User(
      uuidv4(), // Generate a unique id for the user
      firstName,
      lastName,
      email,
    );
    this.users.push(newUser);
    return newUser;
  }

  getUsers(): User[] {
    return this.users;
  }
}
