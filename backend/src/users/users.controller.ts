import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): User {
    return this.userService.getUserById(id);
  }
}
