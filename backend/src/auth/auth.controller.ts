import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): { message: string } {
    // this.authService.login(loginDto);
    return { message: 'login success' };
  }
}
