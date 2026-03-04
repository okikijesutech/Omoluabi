import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: any) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  register(@Body() registerDto: any) {
    return this.authService.register(
      registerDto.email, 
      registerDto.password, 
      registerDto.role as Role
    );
  }
}
