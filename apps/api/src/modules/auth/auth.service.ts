import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { signJwt } from './jwt.util';
import * as bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-me';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && await bcrypt.compare(pass, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: signJwt(payload, JWT_SECRET),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      }
    };
  }

  async register(data: any) {
    const user = await this.usersService.create(data);
    return this.login(user);
  }
}
