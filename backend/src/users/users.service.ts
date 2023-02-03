import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/entities/UserEntity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private userDbService: InMemoryDBService<UserEntity>) {}

  getUsers(): UserEntity[] {
    return this.userDbService.getAll();
  }

  queryUser(query: any): UserEntity[] {
    return this.userDbService.query(query);
  }

  createUser({ username, email }: CreateUserDto): UserEntity {
    const user = {
      id: uuid(),
      username,
      email,
    };

    this.userDbService.create(user);

    return user;
  }

  getUserById(id: string) {
    const user = this.userDbService.get(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
