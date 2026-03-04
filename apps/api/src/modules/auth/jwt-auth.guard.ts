import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { verifyJwt } from './jwt.util';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-me';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const payload = verifyJwt(token, JWT_SECRET);
      request.user = payload; // Attach payload to request object
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
