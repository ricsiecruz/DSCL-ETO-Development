import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  createUser({ username, email }: CreateUserDto): User {
    const user = {
      id: uuid(),
      username,
      email,
    };

    this.users.push(user);

    return user;
  }

  getUserById(id: string) {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
