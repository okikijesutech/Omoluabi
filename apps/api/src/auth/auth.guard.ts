import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // 🛠️ DEV BYPASS: Allow test headers in development to simulate different roles
    if (process.env.NODE_ENV !== 'production') {
      if (request.headers['x-guest-test']) {
        request['user'] = { id: 'guest-contributor-id', email: 'contributor@omoluabi.io', role: 'CONTRIBUTOR' };
        return true;
      }
      if (request.headers['x-reviewer-test']) {
        request['user'] = { id: 'test-reviewer-id', email: 'reviewer@omoluabi.io', role: 'REVIEWER' };
        return true;
      }
      if (request.headers['x-admin-test']) {
        request['user'] = { id: 'test-admin-id', email: 'admin@omoluabi.io', role: 'ADMIN' };
        return true;
      }
    }

    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException();
    }
    
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET || 'omoluabi-cultural-secret'
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
