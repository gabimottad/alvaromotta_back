// auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.usersService.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      return true;
    }

    return false;
  }

  async generateToken(username: string): Promise<string> {
    const user = await this.usersService.findByUsername(username);

    const payload = { username: user.username, sub: user.id };
    const secretKey = this.configService.get<string>('JWT_SECRET');

    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  }
}
