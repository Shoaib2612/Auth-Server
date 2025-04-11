import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth_server.service';
import { AuthDto } from './dto/auth_server.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth_server') export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
