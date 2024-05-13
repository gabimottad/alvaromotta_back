// auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Body() loginData: { username: string; password: string; email: string },
  ) {
    const isValid = await this.authService.validateUser(
      loginData.username,
      loginData.password,
    );

    if (isValid) {
      const token = await this.authService.generateToken(loginData.username);
      return { success: true, message: 'Login successful', token };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
