import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  login({ username, email }: LoginDto): void {
    const users = this.userService.getUsers();

    console.log('users', users);

    const found = !users.every((user) => {
      if (user.email === email && user.username === username) {
        return false;
      }

      return true;
    });

    if (!found) {
      throw new UnauthorizedException();
    }
  }
}
