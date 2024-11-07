import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() args: LoginDto) {
    return this.authService.login(args.email, args.password);
  }

  @Post('register')
  async register(@Body() args: RegisterDto) {
    return this.authService.register(args);
  }
}
