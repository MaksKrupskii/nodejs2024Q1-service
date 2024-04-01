import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshDto, SignupDto } from './dto/authDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly aythService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.aythService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.aythService.login(dto);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshDto) {
    return this.aythService.refresh(dto);
  }
}
